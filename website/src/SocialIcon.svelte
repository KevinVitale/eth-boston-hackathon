<script>
  export let name;
  export let link;
</script>

<style>
  div {
  } 

  img {
    background-color: #eee;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 15%;
    margin: 0 4px;
  }
</style>

<div>
  <a href={link}>
    <img alt="" src="./images/{name}.png"/>
  </a>
</div>

