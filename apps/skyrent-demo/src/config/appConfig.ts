type AppConfig = {
  appName: string;
  appTagline: string;
};

type AppConfigResult = {
  config?: AppConfig;
  warning?: string;
};

const REQUIRED_ENV_VARS = ['VITE_APP_NAME', 'VITE_APP_TAGLINE'] as const;
const DEFAULT_CONFIG: AppConfig = {
  appName: 'SkyRent Drones',
  appTagline: 'Premium Drone Rental Service',
};

export const getAppConfig = (): AppConfigResult => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    return {
      config: DEFAULT_CONFIG,
      warning: `Missing required env vars: ${missing.join(', ')}. Please add your .env with the correct values.`,
    };
  }

  return {
    config: {
      appName: import.meta.env.VITE_APP_NAME,
      appTagline: import.meta.env.VITE_APP_TAGLINE,
    },
  };
};
