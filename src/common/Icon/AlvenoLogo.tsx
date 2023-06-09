import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as StarIcon } from "./AlvenoLogo.svg";

export default function AlvenoLogo(props: SvgIconProps) {
  return <SvgIcon {...props} component={StarIcon} inheritViewBox />;
}
