<template>
    <!-- <div class="firstPage"> -->
        <!-- <header class="headerPage">
            <div class="headerPage__caption">
                <object class="headerPage__logo" :data="icon[0]" type="image/svg+xml"></object>
                <div class="headerPage__name">Share Anonymous</div>
            </div>
            <div class="headerPage__others">
                <ul class="headerPage__list">
                    <li class="headerPage__item">Upload files</li>
                    <li class="headerPage__item">Retrieve files</li>
                </ul>
            </div>
        </header> -->

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
    <!-- </div> -->
</template>

<script>
import Toastify from 'toastify-js';

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
        addFile(e){
            // console.log(e);
            let droppedFiles = [...e.dataTransfer.files];

            if(!droppedFiles) return;

            droppedFiles.forEach(el =>{
                this.files.push(el);
            });

            console.log(`The files count is ${this.files.length}`);
            console.log(this.files[0]);
        },
        removeFile(){
            // this.files = this.files.filter(f=>{
            //     return f != file;
            // });
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


            const objectURL = URL.createObjectURL(this.files[0]);
            console.log(objectURL);

            this.isDownloadFinish = true;

            const anchor = document.createElement('a');
            anchor.href = objectURL;
            anchor.download = 'data_json';
            document.body.appendChild(anchor);
            anchor.click();

            document.body.removeChild(anchor);

            URL.revokeObjectURL(this.files[0]);

        },
        alertToastify(){
            Toastify({
                text: "This is a toast",
                duration: 3000
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
    @import "toastify-js/src/toastify.css";
</style>
