<template>
  <div class="firstPage">
    <header class="headerPage">
        <div class="headerPage__caption">
            <object class="headerPage__logo" :data="icon[0]" type="image/svg+xml"></object>
            <div class="headerPage__name">Share Anonymous</div>
        </div>
        <div class="headerPage__others">
            <ul class="headerPage__list">
                <li class="headerPage__item">
                  <router-link to="/">Upload files</router-link>
                </li>
                <li class="headerPage__item">
                  <router-link to="/retrieveFiles">Retrieve files</router-link>
                </li>
            </ul>
        </div>
    </header>

    <router-view/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
  // import UploadFiles from './views/UploadFiles.vue';

  const icon = ref([
    require('@/assets/Icon/anonymous-iconsvg.svg'), 
    require('@/assets/Icon/cloud-icon.svg'), 
    require('@/assets/Icon/cloud-done.svg'),
    require('@/assets/Icon/files-icon.svg')
  ]);
</script>

<style>

a{
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
