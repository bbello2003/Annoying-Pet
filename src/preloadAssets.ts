const imageModules = import.meta.glob('./assets/**/*.{webp,gif}', { eager: false });
const soundModules = import.meta.glob('./assets/**/*.mp3', { eager: false });

export const preloadAllAssets = (): void => {
  for (const loader of Object.values(imageModules)) {
    (loader as () => Promise<{ default: string }>)().then((mod) => {
      const img = new Image();
      img.src = mod.default;
    });
  }

  for (const loader of Object.values(soundModules)) {
    (loader as () => Promise<{ default: string }>)().then((mod) => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = mod.default;
      audio.load();
    });
  }
};
