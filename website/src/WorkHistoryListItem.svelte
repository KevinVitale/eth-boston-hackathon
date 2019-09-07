<script>
  export let image = "";
  export let name = "";
  export let text = "";
</script>

<style>
  .container {
    display: flex;
    /* border: medium solid black; */
    padding: 0px 0px 8px 0px;
    margin: 0px;
  }

  .content {
    flex-flow: column nowrap;
    /* border: medium solid black; */
    padding: 2px;
    margin: 0px 8px;
  }

  .content h4 {
    color: #666;
    font-weight: 500;
    /* border: medium solid black; */
    margin: 0px;
  }

  .content p {
    color: #aaa;
    font-weight: 100;
    /* border: medium solid black; */
    margin: 4px 0px;
  }

  img {
    margin: 4px 6px;
    min-width: 50px;
    height: 50px;
  }
</style>

<div class="container">
  <img alt="" src="./images/{image}.jpg" />
  <div class="content">
    <h4>{name}</h4>
    <p> {text} </p>
  </div>
</div>
<hr/>
