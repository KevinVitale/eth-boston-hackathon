<script>
  import { onMount } from 'svelte';
  import Web3 from './web3.js';
  import Avatar from './Avatar.svelte';
  import Header from './Header.svelte';
  import SocialIcon from './SocialIcon.svelte';
  import WorkHistoryList from './WorkHistoryList.svelte';

  let projectID = '';
	let tokenId = '';
  let response = '';
	let accounts = [];
	const backend = 'http://localhost:3000';
	const contractABI = "https://gist.githubusercontent.com/KevinVitale/ab14291d0298fb138aba54d63d2a439c/raw/6e75f651a40ad942e8a59cdc0c8c780c2d79b6b9/LOGN.json";

	const deployedTokenContractAddress = '0x4b2dBDFD9A8d40D8A339b2f39B5833bFf981D297';

  const web3 = new Web3(window.ethereum);

  onMount(async () => {
			await window.ethereum.enable();
			accounts = await web3.eth.getAccounts()
  })

	async function decrypt() {
    // var submission = `{ "address": "${accounts[0]}", "tokenId": ${ tokenId} }`
    var submission = {
      address: accounts[0],
      tokenId: Number(tokenId)
    }

    const signatureHash = await web3.eth.personal.sign(JSON.stringify(submission), accounts[0]);
    submission.signature = signatureHash;
    console.log("submission", submission);

    fetch(backend + '/creds/consume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(submission),
    })
    .then(function(response) {
      return response.json();
    })
    // .then(console.log);
    .then((res) => { response = res.creds; });
	}

</script>

<style>
  :global(body) {
    background-color: #eee;
    padding: 0px;
  }

  :global(hr) {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  } 

	input { 
		width: 64px; 
		min-height: 44px; 
	}

  .container {
    /* margin: 0px auto; */
    padding: 0px 0px 40px 0px;
    min-height: 100%;
    max-width: 400px;
    background-color: #fff;
    border-right: thin solid lightgray;
    border-bottom: thin solid lightgray;
  }

  .content {
    padding: 0px 20px; 
  }

  .blurb {
    color: #222;
    font-size: 14px;
    font-weight: 100;
    padding: 0px 0px 0px;
  } 

  .social-icons {
      display: flex;
      justify-content: center;
      flex-direction: row nowrap;
  }

	.address {
    color: #333;
    font-size: 12px;
    font-weight: 100;
    padding: 20px;
	}

  .response {
      color: #aaa;
      background-color: #eff;
      border: thin dashed gray;
      font-family: monospace, monospace;
      font-size: 18px;
      font-weight: 300;
      padding: 20px;
      margin: 0px 20px;
  }

</style>

<body>
  <div class="container">
  <Avatar/>

  <div class="content">
    <Header/>

    <p class="blurb">
      Creating an ERC-721 token which is an
			<b>encrypted</b> representation of your
      credentials belonging to an account for a
      service you have access to.
    </p>

    <hr/>
    <div>
    </div>
  </div>

	<div class="content">
		<p>
			Redeem a LOGN: <input bind:value={tokenId} type="text" />
		</p>
		<button on:click={decrypt}>
			Submit
		</button>
	</div>

  <hr/>

  <Header title="TOKEN CONTENT:"/>
  <div class="response">
  {#if !response.length == '0'}
    {response}
  {/if}
  </div>

  <hr/>
	<div class="address">
	{#each accounts as account}
		{account}
	{/each}
	</div>

  </div>
</body>
