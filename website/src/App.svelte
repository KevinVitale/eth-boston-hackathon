<script>
  import { onMount } from 'svelte';
  import Web3 from './web3.js';
  import Avatar from './Avatar.svelte';
  import Header from './Header.svelte';
  import SocialIcon from './SocialIcon.svelte';
  import WorkHistoryList from './WorkHistoryList.svelte';

  let projectID = '';
	let payload = '';
	let accounts = [];
	const backend = 'http://localhost:3000';
	const contractABI = "https://gist.githubusercontent.com/KevinVitale/ab14291d0298fb138aba54d63d2a439c/raw/6e75f651a40ad942e8a59cdc0c8c780c2d79b6b9/LOGN.json";

	const deployedTokenContractAddress = '0x2b00F3A3F535893Ffb21463EB47839Af64AEd12f';

  //const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/4fd54fedda864aaa820def2e7300d453'));
  const web3 = new Web3(window.ethereum);

  onMount(async () => {
			await window.ethereum.enable();
			accounts = await web3.eth.getAccounts()
  })

	async function encrypt() {
    const response = await fetch(contractABI);
    const abiJSON = await response.json();
    var tokenContract = new web3.eth.Contract(abiJSON.abi, deployedTokenContractAddress)
    var transactionReceipt = await tokenContract.methods.createToken().send({ from: accounts[0], value: 800000 })
    var tokenID = new web3.utils.BN(transactionReceipt.events.Transfer.raw.topics[3].substring(2)).toString()
    var submission = {
      creds: payload,
      address: accounts[0],
      tokenId: Number(tokenID)
    }

    const signatureHash = await web3.eth.personal.sign(JSON.stringify(submission), accounts[0]);
    submission.signature = signatureHash;
    console.log("submission", submission);

    fetch(backend + '/creds/create', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submission),
        })
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

	textarea { 
		width: 100%; 
		height: 200px; 
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
			Credentials To Encrypt: <br/>
		</p>

		<textarea bind:value={payload}></textarea>
		<button on:click={encrypt}>
			Submit
		</button>
	</div>

  <hr/>
	<div class="address">
	{#each accounts as account}
		{account}
	{/each}
	</div>

  </div>
</body>
