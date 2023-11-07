import { LucideProps } from "lucide-react";
import {
  PersonIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  MixIcon,
  MixerVerticalIcon,
  ExitIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  ChevronLeftIcon,
  HamburgerMenuIcon,
  HomeIcon,
  BackpackIcon,
  ExternalLinkIcon,
  GearIcon,
  FileIcon,
  FileTextIcon,
  ChevronRightIcon,
  PlusCircledIcon,
  LightningBoltIcon,
  CaretSortIcon,
  DoubleArrowLeftIcon,
  MinusCircledIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Loader2, Banknote, PanelRightOpen } from "lucide-react";
import Home from "@/app/(lobby)/page";

type logoProps = {
  // color: "light" | "dark";
  size?: "s" | "m" | "l" | "xl";
};

//create a map of sizes
const sizes = {
  s: {
    width: "15",
    height: "21.5",
  },
  m: {
    width: "30",
    height: "43",
  },
  l: {
    width: "90",
    height: "129",
  },
  xl: {
    width: "180",
    height: "258",
  },
};

export const Icons = {
  user: PersonIcon,
  spinner: Loader2,
  view: EyeOpenIcon,
  hide: EyeClosedIcon,
  mix: MixIcon,
  mixerVertical: MixerVerticalIcon,
  logout: ExitIcon,
  search: MagnifyingGlassIcon,
  moon: MoonIcon,
  menu: HamburgerMenuIcon,
  sun: SunIcon,
  home: HomeIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  backpack: BackpackIcon,
  banknote: Banknote,
  externalLink: ExternalLinkIcon,
  gear: GearIcon,
  file: FileIcon,
  fileText: FileTextIcon,
  plusCircled: PlusCircledIcon,
  lightning: LightningBoltIcon,
  caretSort: CaretSortIcon,
  doubleArrowLeft: DoubleArrowLeftIcon,
  plus: PlusCircledIcon,
  minus: MinusCircledIcon,
  logo: (props: LucideProps & logoProps) => {
    const { size, className } = props;

    const { width, height } = sizes[size ? size : "s"];
    // const colors = {
    //   body: color === "light" ? "#FFFFFF" : "#000814",
    //   orange: "#FB8500",
    //   green: "#1AD33C",
    //   dark_green: "#17AA2B",
    // };

    return (
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 90 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_501_2)">
          <path
            d="M87.8 25.44C87.1052 24.742 86.2793 24.1883 85.3697 23.8108C84.4601 23.4332 83.4848 23.2392 82.5 23.24H52.5C50.5117 23.2426 48.6056 24.0337 47.1996 25.4396C45.7937 26.8456 45.0026 28.7517 45 30.74V53.24H37.5C32.5751 53.2387 27.6981 54.2077 23.1478 56.0918C18.5975 57.9759 14.463 60.7381 10.9806 64.2206C7.49811 67.703 4.73593 71.8375 2.85184 76.3878C0.967757 80.9381 -0.00131251 85.8151 1.33417e-06 90.74V113.24C7.98387e-05 114.354 0.124178 115.464 0.370001 116.55C0.410001 116.75 0.460001 116.95 0.520001 117.15C0.591482 117.441 0.67827 117.728 0.780001 118.01C0.860001 118.24 0.940001 118.46 1.03 118.69C1.12 118.92 1.22 119.16 1.33 119.4C1.44 119.64 1.63 120.04 1.8 120.4C1.97 120.7 2.15 121 2.33 121.28C2.51 121.56 2.72 121.88 2.93 122.16V122.22C3.12 122.47 3.31 122.71 3.51 122.94C3.6727 123.143 3.84629 123.336 4.03 123.52L4.35 123.85C4.52 124.03 4.7 124.2 4.89 124.37L5.23 124.66L5.75 125.09L5.98 125.27L6.7 125.78L7.16 126.06C7.30753 126.16 7.46117 126.25 7.62 126.33L8.03 126.56L8.19 126.64L8.57 126.82C8.87 126.97 9.18 127.1 9.5 127.23H9.6L10.02 127.39C10.5471 127.575 11.0847 127.728 11.63 127.85L12.17 127.96C12.3482 128 12.5285 128.03 12.71 128.05H12.9L13.55 128.12L14.25 128.17H14.95H45V120.67C45 118.681 44.2098 116.773 42.8033 115.367C41.3968 113.96 39.4891 113.17 37.5 113.17H30C30.0026 111.2 29.6152 109.249 28.86 107.43C28.1048 105.611 26.9968 103.959 25.6 102.57L25.17 102.17L24.37 101.47C24.07 101.23 23.75 100.98 23.37 100.75L22.37 100.14L21.77 99.82C21.55 99.7 21.33 99.6 21.1 99.5C25.0237 98.2948 29.153 97.9076 33.2323 98.3624C37.3117 98.8172 41.2543 100.104 44.8162 102.144C48.3782 104.184 51.4837 106.933 53.9406 110.221C56.3975 113.509 58.1535 117.266 59.1 121.26C63.9989 117.816 67.9998 113.247 70.7666 107.936C73.5333 102.625 74.9851 96.7282 75 90.74V53.24C78.9782 53.24 82.7936 51.6596 85.6066 48.8466C88.4197 46.0336 90 42.2182 90 38.24V30.74C90.0008 29.7552 89.8068 28.7799 89.4292 27.8703C89.0517 26.9607 88.498 26.1348 87.8 25.44ZM67.4 34.24C67.4348 34.7731 67.3555 35.3074 67.1676 35.8075C66.9796 36.3075 66.6873 36.7618 66.31 37.14C65.7782 37.6638 65.1053 38.0213 64.3736 38.1687C63.6419 38.3161 62.8831 38.247 62.19 37.97C61.4601 37.676 60.8448 37.154 60.4357 36.4819C60.0267 35.8097 59.8458 35.0233 59.92 34.24H67.4Z"
            fill="currentColor"
          />
          <path
            d="M67.63 8.23999H67.37C63.2997 8.23999 60 11.5397 60 15.61V15.87C60 19.9403 63.2997 23.24 67.37 23.24H67.63C71.7003 23.24 75 19.9403 75 15.87V15.61C75 11.5397 71.7003 8.23999 67.63 8.23999Z"
            fill="#FB8500"
          />
          <path
            d="M77.15 8.3H67C66.9997 7.17578 67.5113 6.09616 68.4254 5.29242C69.3394 4.48868 70.5831 4.02475 71.89 4.00002C73.2419 3.99649 74.5432 4.44156 75.523 5.24255C76.5029 6.04355 77.0856 7.13872 77.15 8.3Z"
            fill="#17AA2B"
          />
          <path
            d="M74.1896 2.13263L66.9996 8.29146C66.1223 7.46275 65.6505 6.37556 65.6822 5.2558C65.7138 4.13603 66.2465 3.0698 67.1696 2.27866C68.0916 1.48072 69.337 1.01995 70.6454 0.992733C71.9538 0.965516 73.2238 1.37397 74.1896 2.13263Z"
            fill="#1AD33C"
          />
        </g>
        <defs>
          <clipPath id="clip0_501_2">
            <rect width="90" height="128.24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  },

  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  nextjs: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"
      />
    </svg>
  ),
  facebook: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" {...props}>
      <path
        fill="currentColor"
        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
      />
    </svg>
  ),
  discord: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" {...props}>
      <path
        fill="currentColor"
        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
      />
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="discord"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
};

<svg
  width="15"
  height="15"
  viewBox="0 0 15 15"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.5 0.75L9.75 3H5.25L7.5 0.75ZM7.5 14.25L9.75 12H5.25L7.5 14.25ZM3 5.25L0.75 7.5L3 9.75V5.25ZM14.25 7.5L12 5.25V9.75L14.25 7.5Z"
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
  ></path>
</svg>;
