<script>
  let title = "Sell Your LOGN";
  let subtitles = [""];
</script>

<style>
  .text {
    font-size: 20px;
  }

  .text h1 {
    color: #222;
    font-weight: 500;
    line-height: 1;
		letter-spacing: -2px;
  }

  .text h2 {
    color: #aaa;
    font-weight: 200;
    line-height: 0.25;
  }
</style>

<div class="text">
    <h1>{title}</h1>

    {#each subtitles as subtitle}
      <h2>{subtitle}</h2>
    {/each}
</div>
