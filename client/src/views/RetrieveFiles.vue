<template>
    <section class="sectionTwo">
      <div class="sectionTwo__container">
        <span class="sectionTwo__Title">Retrieve Files</span>
        <div class="sectionTwo__InputContainer">
          <input class="sectionTwo__searchInput" type="text" placeholder="Enter you file id" v-model="fileIdData" @keyup.enter="searchFile">
          <object class="sectionTwo__iconSearch" :data="icon[0]" type="image/svg+xml"></object>
        </div>
        <div class="sectionTwo__FileContainer">
          <span class="sectionTwo__FileName">File name - Size 1 kb</span>
            <object @click="onClick" class="sectionTwo__iconDownload" :data="icon[1]" type="image/svg+xml"></object>
        </div>
      </div>
    </section>
</template>

<script setup>
  import {ref} from 'vue';
  import axios from 'axios';

  const icon = ref([
    require('../assets/Icon/search_icon.svg'), 
    require('../assets/Icon/download-icon.svg')
  ]);
  const fileIdData = ref('');

  const searchFile = async ()=>{
    console.log(`File is: ${fileIdData.value}`);
    
    try {
      // const fileMetadata = await axios.get(`https://api.anonfiles.com/v2/file/C3h8Q870y5/info`);

      const getFileData = await axios.get(`http://localhost:8080/${fileIdData.value}`);
      const URL_Data = getFileData.data.split('href')[8].split('"')[1];

      const anchor = document.createElement('a');
      anchor.href = URL_Data;
      anchor.download = 'data_json';
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
    
    fileIdData.value = '';
  }

  const onClick = ()=>{
    console.log('Hello');
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
          width: 1.2rem;
          height: 1.2rem;
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
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }

    }

  }

</style>
