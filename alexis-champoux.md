# Markdown Extension Examples

# Revue de Code de Louis-Thomas Nolet

--Le bouton Stop ne reste pas lorsque je clique sur Pause

--Ajout de musique amusante

```vue
<template>
  <div>
    <div id="songPlayerControls" class="col-6">
      <button v-if="!isPlaying" id="btnPlay" type="button" class="btn btn-primary" @click="playAudio">
        <i class="bi bi-play-fill"></i> Jouer
      </button>
      <button v-if="isPlaying" id="btnPause" type="button" class="btn btn-primary" @click="pauseAudio">
        <i class="bi bi-pause-fill"></i> Pause
      </button>
      <button v-show="isPlaying" id="btnStop" type="button" class="btn btn-primary" @click="stopAudio">
        <i class="bi bi-stop-fill"></i> Stop
      </button>
    </div>
  </div>
  <div>
    <audio controls id="audioPlayer" ref="audioPlayer" style="display: none;" @ended="audioEnded" @timeupdate="updateTime">
      <source :src="path + songs[currentSongIndex - 1]?.fileName" type="audio/mp3">
    </audio>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import SongsService from '../scripts/SongsService';

const path = "./src/assets/songs/";

interface Song {
  id: number;
  songName: string;
  artistId: number;
  fileName: string;
}
export default defineComponent({
  props: {
    currentSongIndex: Number,
    currentTime:{
      type: Number as () => number | null,
      required: true,
    },
    duration:{
      type: Number as () => number | null,
      required: true,
    },
    onTimeUpdate: {
      type: Function,
      required: true,
    },
    updateDuration: {
      type: Function,
      required: true,
    },

  },
  setup(props) {
    const songsService = new SongsService();
    const songs = ref<Song[]>([]);
    const isPlaying = ref(false);
    const currentSongIndex = ref(0);
    const audioPlayer = ref<HTMLAudioElement | null>(null);
    const audioSource = ref<string>("");


    watch(() => props.currentSongIndex, async (newIndex, oldIndex) => {
      audioPlayer.value?.load();
      await playAudio();
      setInterval(updateTime, 0);
      stopAudio();
    });

    onMounted(async () => {
      audioPlayer.value = document.getElementById('audioPlayer') as HTMLAudioElement;
      try {
        const fetchedSongs = await songsService.getSongs();
        songs.value = fetchedSongs;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    const playAudio = async () => {
  if (audioPlayer.value) {
    try {
      await audioPlayer.value.play();
      isPlaying.value = true;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        //Do nothing
      } else {
        // Rethrow the error if it's not an AbortError
        throw error;
      }
    }
  }
};

    const pauseAudio = () => {
      if (audioPlayer.value) {
        audioPlayer.value.pause();
        isPlaying.value = false;
      }
    };

    const stopAudio = () => {
      if (audioPlayer.value) {
        audioPlayer.value.pause();
        audioPlayer.value.currentTime = 0;
        isPlaying.value = false;
      }
    };

    const audioEnded = () => {
      // Handle the end of the current song and proceed to the next one
      isPlaying.value = false;
      if (currentSongIndex.value < songs.value.length - 1) {
        audioSource.value = songs.value[currentSongIndex.value - 1].fileName;
        playAudio();
      }
    };

    const updateTime = () => {
      if (audioPlayer.value) {
        props.onTimeUpdate(audioPlayer.value.currentTime);
        props.updateDuration(audioPlayer.value.duration);

      }
    };

    return {
      audioSource,
      isPlaying,
      playAudio,
      pauseAudio,
      stopAudio,
      audioEnded,
      audioPlayer,
      songs,
      path,
      updateTime,
    };
  },
});
</script>

```

Trop d'information dans le SongPlayerControl, il est juste supposé emit la commande au component SongPlaye

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
