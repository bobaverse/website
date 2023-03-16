import { Theme } from '@rainbow-me/rainbowkit';
import { AccentColorPreset } from "@rainbow-me/rainbowkit/dist/themes/baseTheme";
import { Property } from "csstype";

import AccentColor = Property.AccentColor;

const darkGrey = '#1A1B1F';

const accentColors: Record<AccentColorPreset, any> = {
  blue: { accentColor: '#3da9ad', accentColorForeground: '#000' },
  green: { accentColor: '#4BD166', accentColorForeground: darkGrey },
  orange: { accentColor: '#FF983D', accentColorForeground: darkGrey },
  pink: { accentColor: '#FF7AB8', accentColorForeground: darkGrey },
  purple: { accentColor: '#7A70FF', accentColorForeground: '#FFF' },
  red: { accentColor: '#FF6257', accentColorForeground: '#FFF' },
};

type RadiusScale = 'large' | 'medium' | 'small' | 'none';
const radiusScales: Record<
  RadiusScale,
  {
    actionButton: string;
    connectButton: string;
    modal: string;
    modalMobile: string;
  }
> = {
  large: {
    actionButton: '9999px',
    connectButton: '12px',
    modal: '24px',
    modalMobile: '28px',
  },
  medium: {
    actionButton: '10px',
    connectButton: '8px',
    modal: '16px',
    modalMobile: '18px',
  },
  none: {
    actionButton: '0px',
    connectButton: '0px',
    modal: '0px',
    modalMobile: '0px',
  },
  small: {
    actionButton: '4px',
    connectButton: '4px',
    modal: '8px',
    modalMobile: '8px',
  },
};

type Blurs = 'large' | 'small' | 'none';
const blurs: Record<
  Blurs,
  {
    modalOverlay: string;
  }
> = {
  large: {
    modalOverlay: 'blur(20px)',
  },
  none: {
    modalOverlay: 'blur(0px)',
  },
  small: {
    modalOverlay: 'blur(4px)',
  },
};

const borderRadius: RadiusScale = 'large';
const overlayBlur: Blurs = 'large';

const defaultAccentColor = accentColors.blue;

const rainbowkitTheme: Theme = {
  blurs: {
    modalOverlay: blurs[overlayBlur].modalOverlay,
  },
  colors: {
    accentColor: defaultAccentColor.accentColor,
    accentColorForeground: defaultAccentColor.accentColorForeground,
    actionButtonBorder: 'rgba(255, 255, 255, 0.04)',
    actionButtonBorderMobile: 'rgba(255, 255, 255, 0.08)',
    actionButtonSecondaryBackground: 'rgba(255, 255, 255, 0.08)',
    closeButton: 'rgba(224, 232, 255, 0.6)',
    closeButtonBackground: 'rgba(255, 255, 255, 0.08)',
    connectButtonBackground: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 90, 234, 0.1) 100%)',
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 90, 234, 0.1) 100%)',
    connectButtonText: '#FFF',
    connectButtonTextError: '#FFF',
    connectionIndicator: '#30E000',
    downloadBottomCardBackground:
      'linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.2) 71.04%), #1A1B1F',
    downloadTopCardBackground:
      'linear-gradient(126deg, rgba(120, 120, 120, 0.2) 9.49%, rgba(0, 0, 0, 0) 71.04%), #1A1B1F',
    error: '#FF494A',
    generalBorder: 'rgba(255, 255, 255, 0.08)',
    generalBorderDim: 'rgba(255, 255, 255, 0.04)',
    menuItemBackground: 'rgba(224, 232, 255, 0.1)',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: '#1A1B1F',
    modalBorder: 'rgba(255, 255, 255, 0.08)',
    modalText: '#FFF',
    modalTextDim: 'rgba(224, 232, 255, 0.3)',
    modalTextSecondary: 'rgba(255, 255, 255, 0.6)',
    profileAction: 'rgba(224, 232, 255, 0.1)',
    profileActionHover: 'rgba(224, 232, 255, 0.2)',
    profileForeground: 'rgba(224, 232, 255, 0.05)',
    selectedOptionBorder: 'rgba(224, 232, 255, 0.1)',
    standby: '#FFD641',
  },
  fonts: {
    body: 'Exo',
  },
  radii: {
    actionButton: radiusScales[borderRadius].actionButton,
    connectButton: '20px',
    menuButton: radiusScales[borderRadius].connectButton,
    modal: radiusScales[borderRadius].modal,
    modalMobile: radiusScales[borderRadius].modalMobile,
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
  },
};

export default rainbowkitTheme;