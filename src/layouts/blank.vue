<template>
    <router-view></router-view>
</template>

<script>
export default {};
</script>

<style scoped>
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
}
button {
    height: 40px;
    width: 75px;
    padding: 2px;
}
.app {
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.container {
    border: solid 1px;
    margin: auto;
    height: 300px;
    width: 500px;
}

.input-group {
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.btn-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    padding: 10px;
}
</style>
