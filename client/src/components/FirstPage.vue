<template>
    <div class="firstPage">
        <header class="headerPage">
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
        </header>

        <section class="sectionOne">
            <div class="sectionOne__largeBox" @drop.prevent="addFile" @dragover.prevent>
                <div class="sectionOne__boxDrop">
                    <object class="sectionOne__logo" :data="icon[1]" type="image/svg+xml"></object>
                    <span class="sectionOne__bigTextDrag">Drag & Drop</span>
                    <span class="sectionOne__smallText">your files here.</span>
                </div>
                <div class="sectionOne__boxData">
                    <span class="sectionOne__bigTextNo">No Data Yet</span>
                    <span class="sectionOne__smallTextProgress">We will show the progress here</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'FirstPage',
    data() {
        return {
            icon: [
                require('@/assets/Icon/anonymous-iconsvg.svg'),
                require('@/assets/Icon/cloud-icon.svg'),
                require('@/assets/Icon/cloud-done.svg'),
            ],
            files: []
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
        },
        removeFile(file){
            this.files = this.files.filter(f=>{
                return f != file;
            });
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @import '../assets/CSS/style.css';
    @import '../assets/CSS/media-queries.css';
</style>
