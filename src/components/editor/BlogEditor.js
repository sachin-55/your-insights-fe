import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import axios from 'axios';
import "react-quill/dist/quill.snow.css";
import './editor.scss';

const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;

const QuillClipboard = Quill.import("modules/clipboard");

class Clipboard extends QuillClipboard {
  getMetaTagElements = stringContent => {
    const el = document.createElement("div");
    el.innerHTML = stringContent;
    return el.getElementsByTagName("meta");
  };

  async onPaste(e) {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = await clipboardData.getData('Text');

    const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];

    if(urlMatches.length>0){
      e.preventDefault();
      urlMatches.forEach(link => {
        axios.get(link)
            .then(payload => {
                // let title, image, url, description;
                let title, image, url;
                for (let node of this.getMetaTagElements(payload)) {
                    if (node.getAttribute("property") === "og:title") {
                        title = node.getAttribute("content");
                    }
                    if (node.getAttribute("property") === "og:image") {
                        image = node.getAttribute("content");
                    }
                    if (node.getAttribute("property") === "og:url") {
                        url = node.getAttribute("content");
                    }
                    // if (node.getAttribute("property") === "og:description") {
                    //     description = node.getAttribute("content");
                    // }
                }

                const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="20%"/><span>${title}</span></div></a>`;

                let range = this.quill.getSelection();
                let position = range ? range.index : 0;
                this.quill.pasteHTML(position, rendered, 'silent');
                this.quill.setSelection(position + rendered.length);
            })
            .catch(error => console.error(error));
    });
    }else {
     //console.log('when to use this') Normally, paste it elsewhere and then copy it.
      super.onPaste(e);
  }

  }
}

Quill.register('modules/clipboard', Clipboard, true);

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

  static create(value) {
      const imgTag = super.create();
      imgTag.setAttribute('src', value.src);
      imgTag.setAttribute('alt', value.alt);
      imgTag.setAttribute('width', '75%');
      imgTag.classList.add('imageUpload');

      return imgTag;
  }

  static value(node) {
      return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
  }

}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);


class VideoBlot extends BlockEmbed {

  static create(value) {
      if (value && value.src) {
          const videoTag = super.create();
          videoTag.setAttribute('src', value.src);
          videoTag.setAttribute('title', value.title);
          videoTag.setAttribute('width', '80%');
          videoTag.setAttribute('controls', '');

          return videoTag;
      } else {
          const iframeTag = document.createElement('iframe');
          iframeTag.setAttribute('src', value);
          iframeTag.setAttribute('frameborder', '0');
          iframeTag.setAttribute('allowfullscreen', true);
          iframeTag.setAttribute('width', '100%');
          return iframeTag;
      }
  }

  static value(node) {
      if (node.getAttribute('title')) {
          return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
      } else {
          return node.getAttribute('src');
      }
      // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
  }

}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class FileBlot extends BlockEmbed {

  static create(value) {
      const prefixTag = document.createElement('span');
      prefixTag.innerText = "Attachments - ";

      const bTag = document.createElement('b');
      // The file name appears next to the text of the attachment using the b tag.
      bTag.innerText = value;

      const linkTag = document.createElement('a');
      linkTag.setAttribute('href', value);
      linkTag.setAttribute("target", "_blank");
      linkTag.setAttribute("className", "file-link-inner-post");
      linkTag.appendChild(bTag);
      //linkTag Comes out like this<a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

      const node = super.create();
      node.appendChild(prefixTag);
      node.appendChild(linkTag);

      return node;
  }

  static value(node) {
      const linkTag = node.querySelector('a');
      return linkTag.getAttribute('href');
  }

}
FileBlot.blotName = 'file';
FileBlot.tagName = 'p';
FileBlot.className = 'file-inner-post';
Quill.register(FileBlot);

class PollBlot extends BlockEmbed {

  static create(value) {
      const prefixTag = document.createElement('span');
      prefixTag.innerText = "vote - ";

      const bTag = document.createElement('b');
      bTag.innerText = value.title;

      const node = super.create();
      node.setAttribute('id', value.id);
      node.appendChild(prefixTag);
      node.appendChild(bTag);

      return node;
  }

  static value(node) {
      const id = node.getAttribute('id');
      const bTag = node.querySelector('b');
      const title = bTag.innerText;
      return { id, title };
  }

}

PollBlot.blotName = 'poll';
PollBlot.tagName = 'p';
PollBlot.className = 'poll-inner-post';
Quill.register(PollBlot);



class BlogEditor extends Component {
  bandId;

  placeholder;

  onEditorChange;

  onFilesChange;

  onPollsChange;

  _isMounted;

  constructor(props) {
    
    super(props);

    this.state = {
      editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : this.props.initialContent,
      files: []
    };

    this.reactQuillRef = null;
    this.inputOpenImageRef = React.createRef();
    this.inputOpenVideoRef = React.createRef();
    this.inputOpenFileRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = html => {
    this.setState(
      {
        editorHtml: html
      },
      () => {
        this.props.onEditorChange(this.state.editorHtml);
      }
    );
    
  };

  imageHandler = () => {
    this.inputOpenImageRef.current.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current.click(); 
  };

  fileHandler = () => {
    this.inputOpenFileRef.current.click();
  };

  insertImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
   
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const url = process.env.API_URL;
      const token = localStorage.getItem('jwtToken');

      const config = {
        headers: { 
          'content-type': 'multipart/form-data', 
          'authorization': `Bearer ${token}`
         }
      }
      formData.append("file", file);
      
      axios.post(`${url}/api/blogs/uploadImage`,formData, config)
      .then(response=>{
        console.log();
        
        if(response.data.status === 'success'){


        const quill = this.reactQuillRef.getEditor();
        quill.focus();
  
  
        let range = quill.getSelection();
        let position = range ? range.index : 0;
  
        quill.insertEmbed(position, "image", { src: response.data.result.secure_url, alt: "Test Image" });
        
        quill.setSelection(position + 1);
  
        if (this._isMounted) {
          this.setState({
              files: [...this.state.files, file]
          }, () => { this.props.onFilesChange(this.state.files) });
      }

      }else{
        return alert('failed to upload file')
      }
    })

    }
    

  };

  insertVideo = (e) => {
    e.stopPropagation();
    e.preventDefault();
   
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const url = process.env.API_URL;
      const token = localStorage.getItem('jwtToken');

      const config = {
        headers: { 
          'content-type': 'multipart/form-data', 
          'authorization': `Bearer ${token}`
         }
      }
      formData.append("file", file);
      
      axios.post(`${url}/api/blogs/uploadVideo`,formData, config)
      .then(response=>{
        console.log();
        
        if(response.data.status === 'success'){


        const quill = this.reactQuillRef.getEditor();
        quill.focus();
  
  
        let range = quill.getSelection();
        let position = range ? range.index : 0;
  
        quill.insertEmbed(position, "video", { src: response.data.result.secure_url, title: "Test videos" });
        
        quill.setSelection(position + 1);
  
        if (this._isMounted) {
          this.setState({
              files: [...this.state.files, file]
          }, () => { this.props.onFilesChange(this.state.files) });
      }

      }else{
        return alert('failed to upload file')
      }
    })

    }
    
  };

  insertFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
   
    if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0];

      let formData = new FormData();
      const url = process.env.API_URL;
      const token = localStorage.getItem('jwtToken');

      const config = {
        headers: { 
          'content-type': 'multipart/form-data', 
          'authorization': `Bearer ${token}`
         }
      }
      formData.append("file", file);
      
      axios.post(`${url}/api/blogs/uploadFile`,formData, config)
      .then(response=>{
        console.log();
        
        if(response.data.status === 'success'){


        const quill = this.reactQuillRef.getEditor();
        quill.focus();
  
  
        let range = quill.getSelection();
        let position = range ? range.index : 0;
  
        quill.insertEmbed(position, "file", response.data.result.secure_url);
        
        quill.setSelection(position + 1);
  
        if (this._isMounted) {
          this.setState({
              files: [...this.state.files, file]
          }, () => { this.props.onFilesChange(this.state.files) });
      }

      }else{
        return alert('failed to upload file')
      }
    })
    
    
    }
  };

  render() {
    return (
      <div style={{width:'75%',margin:'0 auto'}}>
        <div id="toolbar">
          {/* <select
            className="ql-header"
            defaultValue=""
            onChange={e => e.persist()}
          >
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
            <option value="6" />
            <option value="" />

          </select> */}
          <select
            className="ql-size"
            defaultValue="false"
            onChange={e => e.persist()}
          >
            <option value="small" />
            <option value="false" />
            <option value="large" />
            <option value="huge" />

          </select>
          <select
            className="ql-font"
            defaultValue="Sans Serif"
            onChange={e => e.persist()}
          >
            <option value="monospace" />
            <option value="Sans Serif" />

          </select>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <button className="ql-script" value="sub" />
          <button className="ql-script" value="super" />

          <select
            className="ql-align"
            defaultValue=""
            onChange={e => e.persist()}
          >
            <option value="" />
            <option value="center" />
            <option value="justify" />
            <option value="right" />



          </select>
          <button className="ql-list" value="bullet">UL</button>
          <button className="ql-list" value="ordered">OL</button>
          <select
            className="ql-color"
            defaultValue="black"
            onChange={e => e.persist()}
          >
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="yellow" />
            <option value="cyan" />
            <option value="black" />
            <option value="white" />



          </select>
          <select
            className="ql-background"
            defaultValue="white"
            onChange={e => e.persist()}
          >
            <option value="red" />
            <option value="green" />
            <option value="blue" />
            <option value="yellow" />
            <option value="cyan" />
            <option value="white" />
            <option value="black" />



          </select>
          <button className="ql-insertImage">Img</button>
          <button className="ql-insertVideo">Vid</button>
          <button className="ql-insertFile">File</button>
          <button className="ql-link" />
          <button className="ql-code-block" />
          <button className="ql-video" />
          <button className="ql-blockquote" />
          <button className="ql-indent" value='-1'/>
          <button className="ql-indent" value='+1'/>

          <button className="ql-clean" />
        </div>
        <ReactQuill
          ref={el => {
            this.reactQuillRef = el;
          }}
          theme="snow"
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.state.editorHtml}
          placeholder={this.props.placeholder}
        />
        <input
          type="file"
          accept="image/*"
          ref={this.inputOpenImageRef}
          style={{ display: "none" }}
          onChange={this.insertImage}
        />
        <input
          type="file"
          accept="video/*"
          ref={this.inputOpenVideoRef}
          style={{ display: "none" }}
          onChange ={this.insertVideo}
        />
        <input
          type="file"
          accept="*"
          ref={this.inputOpenFileRef}
          style={{ display: "none" }}
          onChange={this.insertFile}
        />
      </div>
    );
  }

  modules = {
    // syntax: true,
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
        insertPoll: this.pollHandler      }
    }
  };

  formats = [
    // 'header',
    'size',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'script',
    'align',
    'list',
    'list',
    'color',
    'background',
    'image',
    'video',
    'file',
    'link',
    "code-block",
    "video",
    "blockquote",
    'indent',
    'indent',
    "clean"
  ];
}

export default BlogEditor;
