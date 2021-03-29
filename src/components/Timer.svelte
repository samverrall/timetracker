<div class="timer-wrapper">
  <div class="timer" class:activeTimer={hasTimerStarted}>
    <h4>Focus timer ⏳</h4>
    <p>You have completed {25 * completedWorkPeriods} minutes of work, and had {compeltedBreakPeriods * 5} minutes of breaks.</p>

    {#if hasTimerStarted && type}
      <p transition:fade>Working on: <i>{type}</i></p>
    {/if}

    {#if !hasTimerStarted}
      <div class="group">
        <input bind:value={type} type="text" placeholder="What are you working on? 🚀">
      </div>
    {/if}

    <div class="clock">
      <h1>{minutesLeft}:{secondsLeft}{hasTimerStarted ? '' : 0}</h1>
    </div>

    <div class="buttons">
      {#if !hasTimerStarted}
        <button class="material-icons" on:click|preventDefault={() => startCountDown()}>play_arrow</button>
      {:else}
        {#if nowAtPaused}
          <button class="material-icons" on:click|preventDefault={() => startCountDown()}>play_arrow</button>
        {:else}
          <button class="material-icons" on:click|preventDefault={pauseTimer}>pause</button>
        {/if}
        <button class="material-icons" on:click|preventDefault={resetTimer}>restart_alt</button>
      {/if}
    </div>
  </div>

  <div class="log">
    <h4>Time log</h4>
    <p>We keep a log of your time, as you work! 🚀</p>

    {#each log as l, i}
      <div class="log--row">
        <div class="type">{getEmoji(l.periodType)}</div>
        {#if l.periodType === 'work'}
          <div class="type">{l.type}</div>
        {/if}
        <div class="completed">{formatDate(l.completedAt)}</div>
      </div>
    {/each}
  </div>
</div>

<script>
  import { config } from '../api/config'
  import { format } from 'date-fns'
  import { fade } from 'svelte/transition'

  let type = ''

  let minutesLeft = 25
  let secondsLeft = 0
  let hasTimerStarted = false
  let countdown = null

  let completedWorkPeriods = 0
  let compeltedBreakPeriods = 0
  let now = null
  let nowAtPaused = null

  let log = []

  function formatDate (date) {
    return format(date, 'HH:mm:ss aa')
  }

  function pauseTimer () {
    nowAtPaused = now

    clearInterval(countdown)
  }

  function resetTimer () {
    minutesLeft = 25
    secondsLeft = 0
    hasTimerStarted = false
    type = ''

    clearInterval(countdown)
  }

  function getEmoji (periodType) {
    switch (periodType) {
      case 'started':
        return '⏰'
        break;
      case 'work':
        return '💼'
        break
      case 'break':
        return '☕️'
      default:
        break;
    }
  }

  function startCountDown (timer, isSecondLoop) {
    const curTime = new Date().getTime()
    const alreadyCompleted = nowAtPaused ? curTime - nowAtPaused : 0
    const twentyFiveMinutesTime =  (curTime + (timer || config.TWENTY_FIVE_MINUTES)) - alreadyCompleted

    if (completedWorkPeriods === 0) {
      log = [...log, {
        count: log.length,
        completedAt: new Date(),
        type: 'Focus on!',
        periodType: 'started',
      }]
    }

    countdown = setInterval(() => {
      hasTimerStarted = true
      nowAtPaused = null

      now = new Date().getTime()

      const distance = twentyFiveMinutesTime - now
      minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      secondsLeft = Math.floor((distance % (1000 * 60)) / 1000)

      if (distance < 0) {
        clearInterval(countdown)

        if (isSecondLoop) {
          isSecondLoop = false

          compeltedBreakPeriods++
          minutesLeft = 0
          secondsLeft = 0

          log = [...log, {
            count: log.length,
            completedAt: new Date(),
            periodType: 'break',
          }]

          startCountDown(config.TWENTY_FIVE_MINUTES, isSecondLoop)
          // Log completed break period
        } else {
          isSecondLoop = true

          completedWorkPeriods++
          minutesLeft = 0
          secondsLeft = 0

          log = [...log, {
            count: log.length,
            completedAt: new Date(),
            type: type || '',
            periodType: 'work',
          }]

          startCountDown(config.ONE_MINUTE, isSecondLoop)
          // Log work peroid
        }
      }
    }, 1000);
  }
</script>

<style>
  .log,
  .timer {
    text-align: center;
    background: #fff;
    border-radius: 2rem;
    padding: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
    margin: 0 2rem 2rem 0rem;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
  }

  .activeTimer {
    animation-name: timerStarted;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    border: 3px solid var(--accent50);
  }

  @keyframes timerStarted {
    from { transform: scale(1.0);}
    to {
      transform: scale(1.015);
      backround: var(-accent);
    }
  }

  .log {
    min-width: 300px;
  }

  .log--row {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-gray);
    width: 100%;
  }

  .log--row:nth-child(odd) {
    background: var(--border-gray);
  }

  .timer-wrapper {
    display: flex;
  }

  .buttons {
    margin: 1rem 0;
  }

  .clock {
    width: 250px;
    height: 250px;
    border: 8px solid var(--accent50);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-weight: 200;
    font-size: 4rem;
    color: var(--accent);
    margin: 0;
  }

  button {
    border-radius: 100%;
    font-size: 2rem;
  }
</style>