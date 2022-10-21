<template>
        <section class="sectionOne">
            <div class="sectionOne__largeBox" @drop.prevent="addFile" @dragover.prevent>
                <div class="sectionOne__boxDrop">
                    <object class="sectionOne__logo" :data="icon[1]" type="image/svg+xml"></object>
                    <span class="sectionOne__bigTextDrag">Drag & Drop</span>
                    <span class="sectionOne__smallText">your files here.</span>
                </div>
                <div :class="filesExist">
                <!-- <div class="sectionOne__boxData  sectionOne__boxData--active"> -->
                <!-- <div class="sectionOne__boxData  sectionOne__boxData--complete"> -->
                    <span class="sectionOne__bigTextNo">No Data Yet</span>
                    <span class="sectionOne__smallTextProgress">We will show the progress here</span>
                    <div class="sectionOne__progressFile">
                        <div class="sectionOne__progressOne">
                            <object class="sectionOne__fileLogo" :data="icon[3]" type="image/svg+xml"></object>
                            <div class="sectionOne__progressPlace">
                                <span class="sectionOne__fileName">{{filesName}}</span>
                                <span class="sectionOne__fileProgressIndicator">Completed</span>
                            </div>
                        </div>
                        <div class="sectionOne__progressButton">
                            <button @click="removeFile()" class="sectionOne__btnRemove">Remove</button>
                            <button @click="uploadFile()" class="sectionOne__btnUpload">Upload</button>
                        </div>
                    </div>
                    <div class="sectionOne__completeProgress">
                        <object class="sectionOne__completeIcon" :data="icon[2]" type="image/svg+xml"></object>
                        <span class="sectionOne__captionComplete">Done</span>
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
import Toastify from 'toastify-js';
import axios from 'axios';
import FormData from 'form-data';

export default {
    name: 'UploadFiles',
    data() {
        return {
            icon: [
                require('@/assets/Icon/anonymous-iconsvg.svg'),
                require('@/assets/Icon/cloud-icon.svg'),
                require('@/assets/Icon/cloud-done.svg'),
                require('@/assets/Icon/files-icon.svg')
            ],
            files: [],
            classBoxData: ['sectionOne__boxData','sectionOne__boxData--active','sectionOne__boxData--complete'],
            isDownloadFinish: false
        }
    },
    methods: {
        async addFile(e){
            let droppedFiles = [...e.dataTransfer.files];

            if(!droppedFiles) return;

            droppedFiles.forEach(el =>{
                this.files.push(el);
            });

            // console.log(`The files count is ${this.files.length}`);
            // console.log(this.files[0]);
            
        },

        removeFile(){
            if(this.files[0]){
                this.files.pop();
                console.log(`File has successfully deleted.`);
                console.log(`The file count is: ${this.files.length ?? 0}`);
            }else{
                console.log('No files in list');
            }
        },

        uploadFile(){
            if(!this.files){
                return;
            }
            this.isDownloadFinish = true;
            this.postFileToAPI(this.files[0], this.files[0].name)
        },

        async postFileToAPI(file, fileName){
            try {
                const form = new FormData();
                form.append('file', file);
                const postData = await axios.post('/api/1/upload', form, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
    
                // console.log(postData.data);
                const fileIdAfterSubmit = postData.data.data.file.metadata.id;
                // console.log(fileIdAfterSubmit);

                this.toastifyClickable(`File ${fileName}, ID: ${fileIdAfterSubmit} has successfully uploaded!.\n Please save the ID for retrieval.`, '#2ecc71');

            } catch (error) {
                console.log(error);
            }
        },

        alertToastify(message, colorHex){
            Toastify({
                text: message,
                duration: 3000,
                style: {
                    background: colorHex,
                }
                }).showToast();
        },

        toastifyClickable(message, colorHex){
            Toastify({
                text: message,
                duration: 1000*60,
                close: true,
                style: {
                    background: colorHex,
                },
            }).showToast();
        }
    },
    computed: {
        filesExist(){
            if(this.files[0]){
                if(this.isDownloadFinish){
                    console.log(this.files.length);
                    return `${this.classBoxData[0]} ${this.classBoxData[2]}`
                }else{
                    return `${this.classBoxData[0]} ${this.classBoxData[1]}`
                }
            }else{
                // return false;
                return `${this.classBoxData[0]}`;
            }
        },
        filesName(){
            if(this.files){
                return this.files[0] ? this.files[0].name : 'No files';
            }
            return '';
        }
    },
    watch: {
        isDownloadFinish(newValue){
            if(newValue){
                setTimeout(() => {
                    this.files = [];
                    this.isDownloadFinish = false;
                }, 1500);
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import '../assets/CSS/style.css';
    @import '../assets/CSS/media-queries.css';
    @import "toastify-js/src/toastify.css";
</style>
