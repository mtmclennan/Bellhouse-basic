import {
  ArrowsSplit,
  Blueprint,
  Broom,
  Buildings,
  CalendarCheck,
  ChatCircle,
  CheckCircle,
  CheckSquare,
  CirclesThreePlus,
  ClipboardText,
  Clock,
  CompassTool,
  Cube,
  Drop,
  Hammer,
  HardHat,
  HouseLine,
  MapPin,
  MapTrifold,
  Path,
  Phone,
  Ruler,
  ShieldCheck,
  Shovel,
  Stack,
  Star,
  Truck,
  User,
  Wall,
} from '@phosphor-icons/react/dist/ssr';

type IconWeight = 'fill' | 'duotone' | 'regular' | 'bold';

type LandingIconProps = {
  name: string;
  size?: number;
  color?: string;
  weight?: IconWeight;
};

export default function LandingIcon({
  name,
  size = 28,
  color = '#ffc302',
  weight = 'fill',
}: LandingIconProps) {
  const props = { size, color, weight };

  switch (name) {
    case 'arrows-split':
      return <ArrowsSplit {...props} />;
    case 'blueprint':
      return <Blueprint {...props} />;
    case 'broom':
      return <Broom {...props} />;
    case 'buildings':
      return <Buildings {...props} />;
    case 'calendar-check':
      return <CalendarCheck {...props} />;
    case 'chat-circle':
      return <ChatCircle {...props} />;
    case 'check-circle':
      return <CheckCircle {...props} />;
    case 'check-square':
      return <CheckSquare {...props} />;
    case 'clock':
      return <Clock {...props} />;
    case 'circles-three-plus':
      return <CirclesThreePlus {...props} />;
    case 'compass-tool':
      return <CompassTool {...props} />;
    case 'cube':
      return <Cube {...props} />;
    case 'clipboard-text':
      return <ClipboardText {...props} />;
    case 'drop':
      return <Drop {...props} />;
    case 'hammer':
      return <Hammer {...props} />;
    case 'hard-hat':
      return <HardHat {...props} />;
    case 'house-line':
      return <HouseLine {...props} />;
    case 'map-pin':
      return <MapPin {...props} />;
    case 'map-trifold':
      return <MapTrifold {...props} />;
    case 'path':
      return <Path {...props} />;
    case 'phone':
      return <Phone {...props} />;
    case 'ruler':
      return <Ruler {...props} />;
    case 'shield-check':
      return <ShieldCheck {...props} />;
    case 'shovel':
      return <Shovel {...props} />;
    case 'stack':
      return <Stack {...props} />;
    case 'star':
      return <Star {...props} />;
    case 'truck':
      return <Truck {...props} />;
    case 'user':
      return <User {...props} />;
    case 'wall':
      return <Wall {...props} />;
    default:
      return null;
  }
}
