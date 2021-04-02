<div class:error={isError} class:success={isSuccess} class="alert-box">
  <h4>{heading}</h4>
  <p>{message}</p>
</div>

<script>
  export let heading = ''
  export let message = ''
  export let isError = false
  export let isSuccess = true
</script>

<style>
  .alert-box {
    border-radius: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 375px;
    margin: 1rem;
    padding: 1rem;
  }

  h4 {
    font-weight: 600;
  }

  .success {
    background-color: rgba(52, 159, 30, 0.075);
  }
</style>