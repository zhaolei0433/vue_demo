<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#29B6F6"
        text-color="#fff"
        active-text-color="#424242">
        <!-- 循环写的路由，其中路由中有  hidden：true 的就不加入循环 -->
        <template
          v-for="route in $router.options.routes"
          v-if="!route.hidden && route.path.indexOf('/menu/') === 0">

          <!-- 循环没有children的路由 -->
<!--          <el-menu-item
            v-if="!route.hasChild"
            :key="route.path"
            :index="route.path">
            <i :class="route.class"></i>
            {{ route.name }}
          </el-menu-item>-->

          <!-- 循环有children的路由 -->
<!--          <el-submenu v-else :index="route.path">
            <template slot="title">{{ route.name }}</template>
            <el-menu-item
              v-for="child in route.children"
              :index="child.path"
              :key="child.path">
              <i :class="child.class"></i>
              {{ child.name }}
            </el-menu-item>
          </el-submenu>-->

          <el-submenu v-if :index="route.path">
            <template slot="title">{{ route.name }}</template>
            <el-menu-item
              v-for="child in route.children"
              :index="child.path"
              :key="child.path">
              <i :class="child.class"></i>
              {{ child.name }}
            </el-menu-item>
          </el-submenu>

        </template>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
    export default {
      name: "menuLy",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>
