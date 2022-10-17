<template>
    <section class="sectionTwo">
      <div class="sectionTwo__container">
        <span class="sectionTwo__Title">Retrieve Files</span>
        <div class="sectionTwo__InputContainer">
          <input class="sectionTwo__searchInput" type="text" placeholder="Enter you file id">
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

  const icon = ref([
    require('../assets/Icon/search_icon.svg'), 
    require('../assets/Icon/download-icon.svg')
  ]);

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
