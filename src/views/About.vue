<template>
  <div class="not-found">
    <div class="card">
      <h1>404 Error</h1>
      <router-link tag="h2" to="/home">回到主页</router-link>
    </div>
  </div>
</template>
<style scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.not-found .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 40vh;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.16);
}
.not-found .card h2 {
  margin-top: 20px;
  cursor: pointer;
  color: #0f2027;
}
.not-found .card h2:hover {
  color: #000;
}
</style>
