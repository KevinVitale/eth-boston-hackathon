<script>
  import WorkItem from './WorkHistoryListItem.svelte';
  export let title = "Previous Work";

  const WorkHistory = [
    { image: "tda",     name: "TD Ameritrade, Inc.", text: "Engineering modern architecture into a best-in-class mobile trading platform." },
    { image: "duo",     name: "Duo Security", text: "An early-stage hire. In late-2018, Duo was acquired by Cisco for $2.35b." },
    { image: "dominos", name: "Domino's Pizza", text: "Crucial to Domino's Pizza transformation as a software company." }
  ];
</script>

<h2>Industry Experience</h2>
{#each WorkHistory as item}
  <WorkItem {...item}/>
{/each}
