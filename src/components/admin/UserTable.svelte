<script>
  import { onMount, getContext } from 'svelte'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import { format, parseISO } from 'date-fns'

  let users = []

  const platform = getContext('platform')

  // https://vincjo.fr/svelte-simple-datatables/#/demo/css
  const settings = {
    sortable: true,
    pagination: true,
    rowPerPage: 50,
    columnFilter: true,
    css: false,
  }

  onMount(async () => {
    try {
      const res = await platform.fetch('http://localhost:5000/api/users')

      users = await res.json()
      console.log(users)
    } catch (error) {
      console.error(error)

      users = []
    }
  })
</script>

<!-- https://github.com/vincjo/svelte-simple-datatables -->
<!-- Currently these datatables do NOT have support for SSR. Using IS_BROWSER will fix this. -->
{#if platform.IS_BROWSER}
  <Datatable {settings} data={users}>
    <thead>
      <th data-key="email">First Name</th>
      <th data-key="name">Email</th>
      <th data-key="createdAt">Created At</th>
    </thead>
    <tbody>
      {#each $rows as row}
        <tr>
          <td>{row.email}</td>
          <td>{row.name}</td>
          <td>{format(parseISO(row.createdAt), 'dd-MM-yyyy HH:mm:ss aa')}</td>
        </tr>
      {/each}
    </tbody>
  </Datatable>
{/if}
