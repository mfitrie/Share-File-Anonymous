<template>
    <section class="sectionTwo">
      <div class="sectionTwo__container">
        <span class="sectionTwo__Title">Retrieve Files</span>
        <div class="sectionTwo__InputContainer">
          <input class="sectionTwo__searchInput" type="text" placeholder="Enter you file id" v-model="InputFileId" @keyup.enter="searchFile">
          <Icon icon="ic:sharp-search" class="sectionTwo__iconSearch" title="Search file" @click="searchFile"></Icon>
          <RotateSquare2 
            :class="showAndHideSpinnerLoading()" 
            style="position: absolute; left: 84%;"
          ></RotateSquare2>
        </div>
        <div class="sectionTwo__FileContainer">
          <span class="sectionTwo__FileName">{{displayFileDescription}}</span>
            <Icon icon="ic:baseline-download-for-offline" :class="showAndHideDownloadIcon()" title="Download File" @click="downloadFile"></Icon>
        </div>
      </div>
    </section>
</template>

<script setup>
  import {ref} from 'vue';
  import axios from 'axios';
  import {Icon} from '@iconify/vue';
  import Toastify from 'toastify-js';
  import {RotateSquare2} from 'vue-loading-spinner';

  const InputFileId = ref('');
  const fileMetadata = ref({
    id: '',
    name: '',
    size: '',
  });
  const isLoading = ref(false);
  const isIconDownload = ref(false);
  const displayFileDescription = ref('No file searched!');

  const searchFile = async ()=>{
    // C3h8Q870y5
    try {
      isLoading.value = true;
      const getFileInfo = await axios.get(`/api/${InputFileId.value}/info`);
      isLoading.value = false;

      alertToastify('File found!', '#2ecc71');

      fileMetadata.value.id = getFileInfo.data.data.file.metadata.id; 
      fileMetadata.value.name = getFileInfo.data.data.file.metadata.name;
      fileMetadata.value.size = getFileInfo.data.data.file.metadata.size.readable;

      console.log(fileMetadata.value.id, fileMetadata.value.name, fileMetadata.value.size);

      displayFileDescription.value = `${fileMetadata.value.name} - Size ${fileMetadata.value.size}`;
      isIconDownload.value = true;

    } catch (error) {
      isLoading.value = false;
      // console.log(error);
      if(error.response.status === 0){
        console.log('CORS problem');
      }
      if(error.response.status === 404){
        console.log('Not found');
        isIconDownload.value = false;
        alertToastify('File not found', '#e74c3c');
      }
    }
    
  }

  const downloadFile = async ()=>{
    try {
      const getFileData = await axios.get(`/download/${InputFileId.value}`);
      const URL_Data = getFileData.data.split('href')[8].split('"')[1];
      alertToastify('File starting to download!', '#2ecc71');
      
      const anchor = document.createElement('a');
      anchor.href = URL_Data;
      anchor.download = fileMetadata.value.name;
      document.body.appendChild(anchor);
      anchor.click();

      document.body.removeChild(anchor);
      

    } catch (error) {
      // console.log(error);
      if(error.response.status === 0){
        console.log('CORS problem');
      }
      if(error.response.status === 404){
        console.log('Not found');
      }
    }
  }


  const showAndHideSpinnerLoading = ()=>{
    if(isLoading.value){
      return 'sectionTwo__spinner sectionTwo__spinner--active'
    }

    if(!isLoading.value){
      return 'sectionTwo__spinner'
    }
  }

  const showAndHideDownloadIcon = ()=>{
    if(isIconDownload.value){
      return 'sectionTwo__iconDownload sectionTwo__iconDownload--active'
    }

    if(!isIconDownload.value){
      return 'sectionTwo__iconDownload'
    }
  }

  const alertToastify = (message, colorHex)=>{
    Toastify({
        text: message,
        className: "info",
        style: {
          background: colorHex,
        }
      }).showToast();
  }


</script>

<style lang="scss">
  *{
    font-size: 1rem;
  }

  .sectionTwo{
    background-color: #EEEEEE;
    display: flex;
    justify-content: center;
    align-items: center;  

    &__container{
      background-color: #fff;
      height: 80%;
      width: 60%;
      border-radius: 1rem;
      display: grid;
      grid-template-rows: 40% 20% 40%;

      .sectionTwo__Title{
        // background-color: green;
        color: #707070;
        text-align: center;
        font-size: 2.5rem;
        font-weight: 600;
        padding-top: 7rem;
      }

      .sectionTwo__InputContainer{
        // background-color: aqua;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .sectionTwo__searchInput{
          text-align: center;
          width: 60%;
          height: 40%;
          border-radius: 0.4rem;
          // background-color: yellow;
          padding: 0.2rem;
        }

        .sectionTwo__iconSearch{
          // background-color: purple;
          position: absolute;
          display: block;
          left: 77%;
          width: 1.5rem;
          height: 1.5rem;
          cursor: pointer;
        }

        .sectionTwo__spinner--active{
          display: block;
        }

      }

      .sectionTwo__FileContainer{
        // background-color: red;
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding-top: 1rem;

        .sectionTwo__FileName{
          padding: 0.3rem;
          font-size: 1.2rem;
          color: #707070;
        }
      }

      .sectionTwo__iconDownload{
        display: none;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        color: #3498db;

        &:hover{
          color: #2980b9;
          transition: 0.3s ease-in-out;
        }
      }

      .sectionTwo__iconDownload--active{
        display: block;
      }

      .sectionTwo__spinner{
        display: none;
      }

      .sectionTwo__spinner--active{
        display: block;
      }

    }

  }

</style>
