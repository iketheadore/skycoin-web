export abstract class BaseCoin {
  abstract id: number;
  abstract nodeUrl: string;
  abstract coinName: string;
  abstract coinSymbol: string;
  abstract hoursName: string;
  cmcTickerId: number;
  coinExplorer: string;
  imageName: string;
  gradientName: string;
  abstract iconName: string;
  abstract bigIconName: string;
}
