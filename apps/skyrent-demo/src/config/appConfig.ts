type AppConfig = {
  appName: string;
  appTagline: string;
};

type AppConfigResult = {
  config?: AppConfig;
  error?: string;
};

const REQUIRED_ENV_VARS = ['VITE_APP_NAME', 'VITE_APP_TAGLINE'] as const;

export const getAppConfig = (): AppConfigResult => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    return {
      error: `Missing required env vars: ${missing.join(', ')}.`,
    };
  }

  return {
    config: {
      appName: import.meta.env.VITE_APP_NAME,
      appTagline: import.meta.env.VITE_APP_TAGLINE,
    },
  };
};
