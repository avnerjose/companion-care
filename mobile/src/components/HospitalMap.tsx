import Colors from "@/constants/Colors";
import { Dimensions, View } from "react-native";
import { Circle, Path, Svg, SvgXml } from "react-native-svg";

interface CircleCoordinate {
  cx: string;
  cy: string;
}

interface HospitalMapProps extends React.SVGProps<SVGSVGElement> {
  activeCoordinate: number;
}

export function HospitalMap({
  width,
  activeCoordinate = 0,
  ...rest
}: HospitalMapProps) {
  const circleCoordinates: CircleCoordinate[] = [
    { cx: "20%", cy: "9%" },
    { cx: "45%", cy: "13%" },
    { cx: "18%", cy: "20%" },
    { cx: "58%", cy: "9%" },
    { cx: "78%", cy: "9%" },
    { cx: "85%", cy: "19%" },
    { cx: "68%", cy: "20%" },
    { cx: "12.5%", cy: "35%" },
    { cx: "25%", cy: "49%" },
    { cx: "50%", cy: "35%" },
    { cx: "85%", cy: "32%" },
    { cx: "85%", cy: "40%" },
    { cx: "65%", cy: "50%" },
  ];

  const { cx, cy } = circleCoordinates[activeCoordinate];
  const originalWidth = 600;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <Svg
      preserveAspectRatio="xMidYMid"
      viewBox={`-2 10 ${originalWidth + 20} ${windowWidth + 200}`}
      height="100%"
      width={windowHeight - 200}
      rotation={270}
      // {...rest}
    >
      <MapContent />
      <Circle cx={cx} cy={cy} r="1.5%" fill="red" />
    </Svg>
  );
}

function MapContent() {
  return (
    <>
      <Path
        fill={Colors.light.secondary[700]}
        d="M15.872 12.373v389h600V248.874c0-24.526.07-26.06.077-43.324v-.002c-.023-.225-.011-.462-.04-1.384-.01-.344.008-.668.045-.976.043-80.058.392-97.1 1.7-99.846-.616-.978-1.008-2.35-.996-4.117.005-.592.01-1.185.02-1.778.02-1.174.054-2.356.142-3.521.075-.935.176-1.87.291-2.8a51.69 51.69 0 0 1-.15-1.753h-1.09v-77h-300zm59 13.001c13.19 0 14 .1 14 1.9 0 1.9-.91 2-14 2.3-13.888.294-14 .3-14-2 0-2.194.112-2.2 14-2.2zm152 0c13.192 0 14 .1 14 1.9 0 1.9-.908 2-14 2.3-13.885.294-14 .3-14-2 0-2.194.115-2.2 14-2.2zm86.8 0c1.598 0 1.7 1.314 1 19.7-.3 10.89-.7 20.5-.9 21.3-.1.8.301 3.4.9 5.7.9 3.892.8 4.3-.9 4.3-1.793 0-1.9-1.123-1.9-25.5 0-23.584.1-25.5 1.8-25.5zm24.2 0-.2 6.2-.2 6.3-.3-5.7-.4-5.7-4.699-.4-4.7-.3 5.3-.2zm23 0h8.5c8.399 0 8.5-.001 8.5 2.499 0 2.3-.207 2.4-2 1.5-1.1-.6-2-1.5-2-2 0-.6-.7-1-1.5-1s-1.5.601-1.5 1.201c0 .8-.3.899-.8.299-1.399-2-4.3-1.5-6.7 1.1l-2.254 2.435c1.5 3.717 5.637 6.347 10.954 5.266 3.898-.8 6.8-3.902 6.8-7.301v-3h64v63h-5.5c-3 0-5.5-.4-5.5-.9 0-1.599-4-1.998-5.5-.499-1.1 1.094-4.108 1.4-13.7 1.2-12.093-.3-12.3-.3-12.6 1.9-.014.11-.157.123-.227.192.14.363.267.731.4 1.097.17.465.308.946.36 1.435.028.28.026.494.031.774.001.18-.008.359-.024.537l.048-.003c.082-.002.164-.003.246 0 .216.028.37.128.48.267H425.873v.094c.817-.29 1.802-.458 2.959-.453.39.002.781.003 1.172.012.143.005 1.432.006 1.454.108l.034.147 8.78.293 9 .3.14.795c.005-.537.001-1.075-.046-1.61a15.401 15.401 0 0 1 .054-2.501c.082-.769.18-1.535.255-2.305.083-.525.206-1.042.347-1.554-.736-2.826-1.15-12.004-1.15-32.125V26.373h154v16.9l-2.7.3-2.8.3v28.901l2.5.6c2.4.6 2.5 1.008 2.8 8.3l.3 7.699h-58.6c-49.26 0-58.5.2-58.5 1.4 0 .573-1.95.632-3.34.838a96.661 96.661 0 0 0-1.09 2.763h.93l-.725.725c.572.122 1.149.218 1.736.232.63.037 1.264.068 1.892.139l.097-.097h11.501V136.639c.383.012.767.03 1.15-.001a76.108 76.108 0 0 1 2.239-.109c.428-.02.858-.019 1.283-.03.206-.145.377-.326.627-.425 1.5-.6 1.7-2.516 1.7-20.2v-19.5h99V110.372h-59v27h59v35h-46v-7c0-5.893-.3-7.2-1.7-7.6-1-.3-2.6-1-3.5-1.5-2.798-1.5-27.7-1.1-32.3.5l-4 1.4-.299 7.1-.3 7.1h-4.601c-2.6 0-6.2-.501-8-1.2l-1.25-.454c-.384.028-.77.042-1.154.058-1.626.079-3.22.443-4.844.555-.432.03-.865.034-1.298.05a3.07 3.07 0 0 1-1.05-.126c-.02.001-.016.018-.035.018a37.653 37.653 0 0 1-4.316-.177c2.725.832 1.613 1.085-19.552 1.176l-26.801.1v8c.017.131.03.262.04.393a2.253 2.253 0 0 1-.037.66c-.023.132-.043.264-.065.396-.02.117-.032.236-.052.353a.997.997 0 0 0-.018.264c.001.099.01.196.02.294.007.11.031.219.053.327.025.135.053.269.075.404.02.13.027.263.032.394.006.125.007.25-.001.374a10.67 10.67 0 0 0-.025.743c0 .139-.001.278-.01.417-.006.177-.02.355-.033.532a5.01 5.01 0 0 0-.016.523l.188.017a3.86 3.86 0 0 0 .51.01c.053-.006.106-.008.158-.017.06-.012.121-.026.181-.043v-.04h39v8.7l-.1 8.738v.018l.005.14c-.002.203-.003.406 0 .609.352 0 .704.001 1.056.004.508.005 1.015.012 1.522.03.452.016.904.045 1.355.071l.126.003c.138-.03.804-.214.837-.214.002-.002.002.232.004.234a19.636 19.636 0 0 1 1.802.157l3.693-.29 3.7-.3v-16.9l53.3.2 53.2.3V225.872l-54 .3c-29.682.1-55.5 0-57.3-.3l-3.3-.6.002-.053h-3.569c-.63-.011-1.26.06-1.884.107-.213.016-.325.016-.447.02.022.352.05.705.094 1.055.03.252-.013.446-.096.58v36.291l-.228.122c.097.128.196.253.297.378.454-.007.908-.01 1.362-.009.965.023 1.933.12 2.89.277.587.097 1.173.196 1.757.306l3.923-.574 3.999-.699V238.374l53.3.2 53.2.3.3 24.7.2 24.8h-53.5c-45.86 0-53.5-.201-53.5-1.4 0-1-1.302-1.602-3.7-1.801l-.739-.059c-.084.02-.174.036-.275.043-.472.033-.945.03-1.417.061-.119.011-.239.012-.358.02-.034.035-.068.07-.097.106-.135.044-.266.104-.404.133-.242.052-1.03-.1-1.313-.147-.647.015-1.295.024-1.942.029-.654.005-1.308.005-1.962.006l-2.345.001c.026.262.058.522.17.763.1.175.145.362.192.556.12.483-.077.835-.359 1.015.187.341.55.503.55 1.173v2.5h-102.9l-.006-.021c-.262.014-.526.015-.788.02l-.605.009.511 4.265c.09.092.143.252.114.477l-.03.22.003.03h-.008c-.036.244-.077.487-.107.732-.019.268-.01.535.074.793.087.272.022.46-.099.542l.44 2.934.7 4h223.7v82h-33.2l.4-21.5.4-21.6-10.4.3-10.4.3.2 21.2.1 21.3h-25.1v-36h-6v36h-37V344.372h-20.5l.3 21.501.3 21.5h-27.1V350.372h-7V387.374h-11.6c-7.398 0-11.3-.402-10.9-1.001.3-.6 1.101-.999 1.701-.999.6 0 2.7-1.402 4.7-3.2 8.091-6.995 12.193-15.995 4.7-10.3-1.8 1.4-3.501 2.2-3.901 1.9-1-1-8.7 6.001-8.7 7.9 0 .999.5 1.5 1 1.2.6-.4.8-1.001.5-1.5-.3-.4 1.401-2.302 3.7-4.2 2.3-1.799 3.9-2.7 3.5-2.1-1.3 1.998.5 1.498 3.1-1 1.4-1.198 2.201-1.7 1.901-1.1-.3.6-4.107 3.903-8.4 7.5-4.3 3.497-7.2 5.599-6.4 4.6.894-1.1 1-1.701.2-1.701s-1.1-5.711-1.1-19.5v-19.5h-20.501l.3 21.501.3 21.5h-20.1v-35h-6V387.373h-60v-8.799c0-8.593 0-8.699 1.8-6.1.9 1.498 3.1 3.701 4.7 5.1 6.493 5.296 15.193 7.396 10.9 2.7-2.399-2.698-4.099-2.398-1.8.3 1 1.199-1.707-.804-6.1-4.4-4.399-3.698-7.9-7.2-7.7-7.7.1-.6-.2-1.1-.7-1.1-.5 0-1.1-1.702-1.3-3.8-.2-3.097 0-3.8 1.2-3.6.8.199 10.91.5 22.3.7l20.8.3-.3-10.4-.3-10.4-21.7.2-21.8.1v-5.101h52.1l-.3-3.299-.3-3.2-25.7-.3-25.8-.2V305.373h21c20.585 0 21 .001 21-2.1 0-.91.431-2.236.83-3.313a.813.813 0 0 1-.02-.306c.036-.277.07-.558.109-.83.076-.548.251-1.075.404-1.604.055-.176.124-.346.183-.52.014-.17.025-.341.035-.51.006-.116.05-.225.062-.34a11.99 11.99 0 0 1-.355-1.42c-.232.024-.465.055-.697.06-.442.006-.593-.274-.458-.483.216-.895-.19-2.11-1.193-2.934-1.4-1.3-1.9-3-1.9-6.7v-5h-11v5c0 2.7-.4 5.001-1 5.001-.5 0-1-2.302-1-5.001v-5h-11v5c0 2.7-.407 5.001-1 5.001-.5 0-1-2.302-1-5.001v-5h-11v5c0 2.7-.4 5.001-1 5.001-.5 0-1-2.302-1-5.001v-5h-11.2l.4 5c.2 3.8-.1 5.202-1.4 6.2-1.7 1.194-1.8 4.733-1.8 49.001v47.8h-72V360.77c-.9-.201-1.286-.986-.913-1.708l-4.087.512v-.109c-.567.254-1.219.04-1.562-.587l-3.638.296-3.8.3v27.9h-145v-9.8c0-12.09-.905-13.5-8.1-12.201-2.498.5-6.502.701-9 .501l-4.4-.3-.299-6-.3-5.9 4.299-.6c2.298-.3 6.402-.2 9.1.299 7.893 1.599 8.7.49 8.7-11.6 0-9.393-.101-10.1-2.2-11.3-1.598-.8-3.702-.9-6.8-.3-2.497.4-6.402.601-8.7.401l-4.3-.401v-37.799h11c3.213 0 3.59.27 4.583.482a.425.425 0 0 1 .3-.087c.2.007.4.016.601.033.33.026.659.055.987.09.29.034.58.07.87.106.02-.003.023-.02.047-.02.291-.014.58-.035.87-.056.103-.005.207-.008.31-.009.242-.002.484.006.726.015.02-.003-.011-.03.01-.03.04 0 .081.005.126.014.096.019.194.02.29.036.352.022.703.052 1.05.109.273.044.545.092.82.124.1.01.2.017.3.026l.057.005c.242.012.482.02.724.034l-.015-.222c-.313-3.628-.395-3.728-.766-7.205-.09-.841-.164-1.684-.246-2.526-.002-.47-.028-.94-.006-1.41.005-.106.03-.21.048-.315-.188-.13-.355-.37-.448-.736-.044-.172-.09-.345-.108-.523-.608-1.643-1.46-1.936-11.23-1.936h-10.9v-87h93v87h-10.5c-9.392 0-10.507.201-11.5 2-.02.04-.11.047-.17.07-.038.32-.043.642-.048.964l-.003.366c.187.205.26.575.082 1.063a5.854 5.854 0 0 0-.091.264l-.002.297c.015.671-.031 1.341-.067 2.01-.023.445-.04.89-.038 1.333l10.638-.167c12.385-.2 12.7-.299 12.8-2.499.1-1.594.2-1.8.6-.5.2.998.3 2.4.1 3-.2.998-3.41 1.199-13.301.799l-10.837-.5c.003.176.008.352.02.528.064.715.155 1.43.246 2.141.127.762.209 1.528.298 2.294.02.18.04.359.063.538h95.71v9c0 8.707.066 8.944 2.313 8.952.081-.006.165-.008.252-.008h3.39c1.141.015 2.28-.075 3.412-.21a43.949 43.949 0 0 1 2.55-.266c.17-.012.34-.02.51-.03 1.29-.571 1.574-2.317 1.574-15.538v-15.901h-74.001v-91.999h11.862c.077-.005.157-.009.242-.006.037 0 .075.004.113.005h1.784v.132c.412.02.83.03 1.238.038l-.008-.168c-.035-.63-.096-1.271-.076-1.907.016-.364.043-.728-.01-1.09-.047-.329-.131-.65-.17-.98-.04-.396-.07-.796.034-1.187.064-.28.143-.558.213-.838h-.222l-.6-4-.7-3.999H125.873v-6.501c0-2.376.127-3.34.297-4.332-.114-.094-.193-.248-.221-.45-.008-.485.069-.967.105-1.45.044-.471.096-.947.048-1.42l-.013-.126c-.04-.191-.01-.24.243-.258a1.209 1.209 0 0 1 .005-.271c-.252.006-.503.018-.755.028-.334.013-.67.022-1.003.028-.305.005-.61.005-.916.005-.411.003-.82.038-1.232.058-.374.03-.749.06-1.125.08-.186.053-.198.608-.433.608-1.8 0-2 .708-2 7v7.001h-90v-30h65V135.373h-65V106.375h90v8.4c0 6.921.395 7.684 1.846 8.216h.113c.386-.01.773-.025 1.16-.035.36-.01.719-.013 1.078-.015l1.371-.003c.316-.005.631 0 .946.007l.286-8.071.3-8.499h16.5c15.303 0 16.244-.149 16.287-1.916v-.001c.004-.078.018-.162.042-.251.105-.386.248-.758.403-1.126l.1-.233c0-.178-.01-.356-.002-.534.006-.388.048-.78.083-1.16.027-.265.003-.537.017-.798.014-.195.027-.39.035-.586-.005-.146-.04-.289-.06-.434a1.957 1.957 0 0 1-.003-.707c.018-.237.03-.476.02-.713-.05-.358-.09-.72-.079-1.077l.015-.114c-.216-1.493-.457-3.206-.457-4.351 0-.356.137-.457.192-.702-.06-.272-.115-.547-.197-.814a11.305 11.305 0 0 0-.268-.542c-.088-.176-.193-.347-.247-.54-.056-.183-.106-.369-.151-.556-.177.003-.391-.087-.6-.31-.079-.085-.15-.177-.228-.264a1.231 1.231 0 0 1-.136-.185c-.146.024-.29.061-.438.074-.217.017-.434.025-.652.03-.179.004-.36.004-.537.005l-.522.001h-.915a4.735 4.735 0 0 1-.288-.003c-1.531.062-1.926.778-2.214 5.007l-.3 5.3-61.2.299-61.3.2V26.375h31v5h30v-5h62v13.4c0 12.148.153 13.25 1.906 13.765.18.072.37.145.554.218.73.297 1.525.328 2.302.37.729.03 1.457.038 2.186.034a1.75 1.75 0 0 1 .006-.082c.018-.066.032-.134.053-.2l-.006-.005V26.373H193.872v89.001h43.05a.803.803 0 0 1 .144-.007c.066.001.133.004.2.007h.307l.003.018c.095.006.19.013.284.022.15.014.3.032.45.05.088-.03.178-.054.27-.067.014-.038.032-.073.039-.115.034-.14.074-.277.135-.402-.008-.037-.02-.073-.027-.111a15.79 15.79 0 0 1-.192-1.039 3.144 3.144 0 0 1 .022-.845c.04-.16.092-.318.09-.486.014-.246-.003-.492 0-.738l-.01-.813c-.005-.125-.017-.25-.017-.374v-.072c-.017-.009-.044-.013-.048-.029-.5-1.9-1.415-2-19.6-2h-19.1v-82h6c5.699 0 6 .1 6 2.5v2.501h30V26.373h55v81h-11.3c-11.191 0-11.4 0-12.5 2.5l-.712 1.484c.03.164 0 .37-.124.602-.01.018-.025.03-.034.047.028.586.068 1.17.098 1.755.011.177.024.362.038.544.293.002.585.009.878.003.469-.029.947-.072 1.419-.125a1.31 1.31 0 0 1 .171-.009c.24.005.402.086.488.2h21.578v58h-60.7l-.7 3.999-.225 1.501c-.01.335-.028.67-.04 1.005-.02.496.045.991.082 1.484.041.619.054 1.24.065 1.86.009.558.01 1.116.013 1.675-.002.607-.073 1.212-.113 1.818l-.001.064c.268.051.54.245.75.607.675-.046 1.35-.094 2.025-.13.593-.042 1.181-.112 1.771-.172.123-.012.238-.017.346-.013.401.013.704.13.907.301H401.496c.075-.007.15-.013.223-.026.096-.018.192-.03.29-.037.16-.008.32-.009.479-.01.209-.013.418-.02.627-.035l-.542-4.891h.21a2.472 2.472 0 0 1-.002-.237c.002-.086.007-.172.01-.258a.52.52 0 0 1 .035-.566l.005-.055.008-.1-.566-3.785-.7-3.999h-88.701V95.373h51.458c.436-.138.885-.233 1.333-.313.457-.09.922-.116 1.383-.169.268-.022.533-.066.798-.108l-.46-.737c-.465-.8-.923-1.604-1.41-2.39-.11-.194-.217-.39-.327-.584-.12-.07-.3-.08-.375-.199l-1.6-2.499h-50.9l.3-5.3c.3-5.592-.092-5.3 7.7-5.6 4.093-.2 11.507-8.802 14-16.201 2.5-7.792 4.1-18.007 4.1-27.699v-7.201h21v3c0 .688.801 1.011 1 1.633v-2.532zm0 5.632v.667l.246-.265c-.06-.149-.197-.249-.246-.402zm-45-3.833 2.3.6c1.2.3 2.8.601 3.5.601.7 0 1.2 1.4 1.2 3.5 0 1.899-.407 3.499-1 3.499-.5 0-1 1.3-1 3 0 2.6.401 3 2.6 3 2.6 0 2.6 0 1.9-6.4l-.7-6.3 3.2-.699c1.793-.3 4.4-.6 5.8-.6h2.5l-.6 11.2c-.744 15.18-4.835 27.576-10.289 32.918 3.945-3.833 7.914-9.92 9.19-16.719.4-2.2.9-3.3 1.1-2.7.3.694-.2 3.6-1.1 6.5-2.9 9.892-10.007 18.594-14.3 17.5-1.5-.4-1.4-.5.4-.6 1.314-.055 2.9-2.326 4.426-3.741-1.792 1.661-3.716 2.641-5.727 2.641-2.699 0-3.4-.4-3.4-1.9 0-3 1.1-5.099 2.6-5.099 2.1 0 1.7-1.7-.6-2.3-1.9-.5-2-1.417-2-19.201zm50.426 2.213c1.35-.087 2.624.288 2.674 1.188 0 1 .201 1 .601 0 .7-1.794 5.3-1.499 6 .4.8 2.194-1.401 3.4-6.2 3.4-4.794 0-7.001-1.206-6.201-3.4.35-.949 1.776-1.5 3.126-1.588zm-43.726 8.287c.2.899.9 1.501 1.4 1.201.5-.4.9-.1.9.4 0 .6-.707 1.1-1.5 1.1-.9 0-1.5-.9-1.4-2.3.1-1.694.2-1.801.6-.401zm15 1.4c.2.7.2 1.9 0 2.5-.3.694-.5.201-.5-1.199 0-1.4.2-1.9.5-1.3zm261.2 5.3h5.1v14.1c0 13.985 0 13.999-2.2 13.7-2.2-.3-2.299-.614-2.599-14.1zm-262.199 1.201c.2 1 .2 2.6 0 3.5-.3.993-.501.199-.501-1.701 0-1.9.201-2.699.501-1.799zm-180.9 11.45c.013.015.03.025.045.036l-.012-.015c-.012-.007-.043-.032-.034-.022zm8.653 2.456-.001.003.004-.002-.003-.001zm-2.85 1.192c.054.05.11.097.164.145l-.044-.066-.12-.079zm-3.733 7.606c-.007.118-.014.237-.026.354l.028-.073c-.002-.088-.004-.154-.002-.281zm15.604 1.969.136.137-.015-.026c-.03-.032-.06-.064-.092-.095l-.03-.016zm9.394 7.396c.04.047.08.093.12.142l.012-.012zm-4.862 3.227c-.008.002-.021.01-.035.017a.5.5 0 0 1 .012.007l.023-.024zm-20.442 3.63v.004h.002l-.002-.005zm-2.29 2.112c-.003.013-.013.012-.017.025l.037-.014-.02-.011zm10.011.502a7.548 7.548 0 0 0-.837.333c.281-.105.56-.214.837-.333zm263.715 1.559c1.1-.1 2 .202 2 .801 0 .5-.9.9-2 .9s-2.001-.407-2.001-.8c0-.4.9-.801 2-.901zm0 3.1c1.1 0 2 .4 2 .8 0 .394-.9.8-2 .8s-2.001-.406-2.001-.8c0-.4.9-.8 2-.8zm-33.777 1.882.046.023c.145 0 .293.008.44.006l-.486-.03zm85.49 2.632.009.013.051-.003a.628.628 0 0 0-.06-.01zm2.594.426.003.057c.025-.015.052-.028.076-.044-.026-.005-.052-.012-.079-.013zm-330.608 1.361c.9-1 1.5-.8.9.2-.4.5 0 1.2.6 1.4.8.3.6.599-.4.599-1.8.1-2.399-.999-1.1-2.199zm324.381 2.543-.442.409a1.4 1.4 0 0 1 .003.047c.05-.051.105-.099.154-.151.092-.105.19-.203.285-.305zM168.07 101.8c-.223.007-.317.018-.119.037.04-.01.08-.025.12-.037zm-4.074.504-.023.116c.047-.003.028-.028.078-.03-.022-.028-.034-.057-.055-.086zm209.088.755-.02.005.141.143.027-.033a.321.321 0 0 1-.148-.115zm103.53 1.073-.054.028.013.013zm-21.886 5.643.016.077.02-.016c-.012-.024-.022-.03-.036-.061zm-69.296.45c.066.066.133.132.198.199.01-.007.022-.01.032-.016-.077-.064-.16-.128-.23-.183zm-144.85.867.043.016-.019-.015-.025-.001zm333.991 1.283h28.3V135.373h-58v-10.8c0-6 .3-11.199.7-11.499.3-.4 13.414-.7 29-.7zm-334.494.697c-.022.079.043.116.013.031l-.013-.03zm16.459.138c.006.022.014.044.022.066l.042.003c.015-.02.03-.039.046-.057l-.11-.012zm-12.845.114-.003.05h.275c-.091-.015-.181-.035-.272-.05zm-2.653.002c-.005.015.007.033.001.048h.057a.62.62 0 0 1-.058-.048zm148.271 1.097.07.058a.049.049 0 0 0-.007-.023.09.09 0 0 0-.063-.035zm-149.201 7.35c.019.04.038.08.06.118l-.04-.099v-.005l-.02-.014zm19.059 2.917-.17.102.013-.005.129-.062.028-.035zm-128.37 4.109.005.09.012-.013-.012-.071zm.082.442c-.003.01-.008.018-.01.027v.001l.015.018h.002l-.007-.046zm2.321 3.283.002.012.013.001-.015-.013zm116.486 1.89.008.019c.001-.002.002-.005.004-.006l-.012-.014zm2.548.634.011.006h.003l.003-.003-.017-.003zm-129.036 3.848-.035.114.046.037-.01-.151zm370.87 3.918-.068.034-.127.158.195-.192zm-350.932 3.805c.01.015.055.06.066.077l.02-.025c-.03-.016-.057-.036-.086-.052zm4.914.549.014.023.07.07c-.035-.037-.055-.06-.084-.093zm-8.608 6.41-.015.007-.017.046.012-.002.022-.038-.002-.013zm341.618 2.064-.226.167c-.032.052-.064.099-.095.148.106-.105.215-.21.32-.315zm39.811 1.733h30v9h-30v-4.5zm-43.777.114c-.01.005-.018.003-.029.009l-.044.107.024-.02.05-.096zm41.078 1.086c.8.294 1.2 2.6 1.2 6.8 0 4.198-.4 6.5-1.2 6.7-1 .393-1.301-1.408-1.301-6.7 0-5.294.3-7.1 1.3-6.8zm36 0c.8.294 1.2 2.6 1.2 6.8 0 4.198-.4 6.5-1.2 6.7-1 .393-1.301-1.408-1.301-6.7 0-5.294.3-7.1 1.3-6.8zm-77.756 3.549-.01.013.004.002.006-.015zm9.728 4.898c.227.14.478.234.717.353l.065-.002c-.263-.15-.518-.205-.782-.35zm34.727.352h29.8l.401 3 .5 3H520.872v-3zm-293.918 13-.001.014.597-.014zm201.812.29c-.004.004-.01.006-.013.01l.023-.01zm-25.396.569a.038.038 0 0 0-.002.01c.01 0 .019-.002.028-.003l-.001-.001-.025-.006zm34.648.133-.008.009h.006a.034.034 0 0 0 .002-.009zm-19.122.005-.166.001-.249.003h.413l.002-.004zm-15.636.002v.002h.025l-.003-.002zm37.919.786.001.011.002-.011h-.003zm-365.506 3.416c26.476-.1 48.199.1 48.199.5 0 .7-36.034.7-79.5 0-9.293-.1 4.722-.4 31.3-.5zm161.045 2.755-.034.002c.004.018.004.038.009.057.007-.02.016-.04.025-.059zm165.436.016-.01.002.003.013a.301.301 0 0 1 .008-.003l-.001-.012zm-252.281 1.276v.007c.01.006.02.011.036.015-.011-.008-.024-.015-.036-.022zm252.614.043-.027.002v.003l.027-.006zm1.716.804-.098.003.101.006-.003-.01zm-252.445 2.007-.041.095.023.107c.012.057.026.113.04.17l-.007-.162-.015-.21zm37.586 1.442c-.01.028-.027.07-.04.1l.061-.059c-.008-.013-.01-.025-.02-.04zm253.244 3.94c-.005.065-.007.131-.01.197l.034.135c-.004-.043-.008-.085-.01-.128-.006-.068-.01-.136-.014-.205zm-.95 10.524a1.19 1.19 0 0 1-.065.006v.041c.027-.016.042-.016.067-.03l-.001-.017zm-291.765 2.09v.269l.014.01c-.005-.093-.007-.187-.014-.28zm264.844 2.358c-.908.27-5.088.544-11.344.544h-12.501v3c0 3-.102 3-5.3 3-2.9 0-5.8.5-6.5 1.2-.7.7-1.2 4.103-1.2 8.401 0 8.193.208 8.4 8.1 8.4 2.7 0 4.9.4 4.9 1s-4.708.999-12 .999h-12v-4.1c0-5.692-1.608-6.9-9.1-6.9-7.698 0-9.9 1.6-9.9 7.2 0 3.693-.107 3.8-3.5 3.8h-3.5V264.374h80v-48.82a.98.98 0 0 1-.007-.064c-.044-.45-.029-.903-.015-1.353.01-.415.044-.827.082-1.24-.087-.01-.173-.019-.26-.032-.382.019-.764.038-1.146.051-.548.018-1.095.02-1.642.043-.547.019-1.094.03-1.641.023h-1.087c-.21 0-.356-.064-.44-.153zm-22.845 1.545h28V263.373h-78V240.374h50v-13.001zm45.794 4.012c-.005.006-.021.002-.03.003l.017.065.013-.068zm-200.793 1.695c-.014.011-.042.017-.056.028l.056.035zm149 .592c3 0 4.297.201 2.799.401-1.6.2-4.005.2-5.5 0-1.6-.2-.293-.401 2.7-.401zm55.44.65v.05h.03c-.01-.015-.019-.035-.03-.05zm-61.44 1.05c.6 0 1 2.806 1 6.5 0 3.7-.4 6.501-1 6.501s-1.001-2.802-1.001-6.501c0-3.694.4-6.5 1-6.5zm1.9 0h9.099V235.474l-4.2-.3-4.3-.301-.3-6.299zm97.946 3.956c.005.015.007.03.01.045h.197l-.087-.02c-.04-.01-.08-.016-.12-.025zm-4.386.011c-.008.012-.018.023-.028.034h.232l-.204-.034zm-9.471.02-.01.014h.043a1.253 1.253 0 0 1-.033-.013zm-108.49 4.013c3.7 0 6.5.4 6.5 1s-2.8 1.001-6.5 1.001c-3.693 0-6.5-.4-6.5-1s2.807-1.001 6.5-1.001zm-6.5 3h13v6h-13v-3zm-1.3.2c.2.994.2 2.6 0 3.5-.3 1-.5.201-.5-1.699 0-1.9.2-2.7.5-1.8zm16 0c.2.994.2 2.801 0 4.001-.2 1.3-.4.499-.4-1.7-.1-2.2.1-3.2.4-2.3zm110.463 34.266c-.01.03-.022.06-.028.093l.006.005.01-.002a.155.155 0 0 0 .012-.096zm-190.263 12.535h9.2l-.3 4.2c-.3 4.293-.307 4.299-4.3 4.299-4 0-4 .001-4.3-4.3zm13 0h9.2l-.3 4.2c-.3 4.293-.3 4.299-4.3 4.299-3.993 0-3.999.001-4.299-4.3zm13 0h9.2l-.3 4.2c-.3 4.293-.3 4.299-4.3 4.299-3.993 0-4 .001-4.3-4.3zm13 0h9.2l-.3 4.2c-.3 4.293-.307 4.299-4.3 4.299-4 0-4 .001-4.3-4.3zm49.795 3.347c.004.01.015.019.02.03l-.003-.025-.017-.005zm2.44 1.198-.018.005.024.006-.006-.01zm-1.41 1.398-.024.001.009.022.025-.003-.01-.02zm-336.724.457c6.295 0 8.897.1 5.7.3-3.098.2-8.303.2-11.501 0-3.097-.2-.494-.3 5.8-.3zm35.008.004-.02.022h.005l.015-.022zm272.665.153-.006.004.009.022c0-.009-.003-.018-.003-.026zm.011.27.012.058c.005.01.012.02.02.032l-.01-.076a.12.12 0 0 0-.022-.013zm1.029.015v.009a.07.07 0 0 0 .026.004l-.026-.013zm-2.565 1.405c-.012.037-.02.075-.03.113l.014.02c.005-.045.008-.087.016-.133zm-54.65 2.052c3.294 0 4.801.2 3.301.4-1.498.2-4.2.2-6 0-1.798-.2-.6-.4 2.7-.4zm13.5 0c2.994 0 4.296.2 2.802.4-1.6.2-4 .2-5.5 0-1.6-.2-.301-.4 2.699-.4zm12.502 0c2.8 0 4 .2 2.8.4-1.3.2-3.506.2-5 0-1.6-.2-.5-.4 2.2-.4zm12.5 0c3 0 4.297.2 2.799.4-1.6.2-4.005.2-5.5 0-1.6-.2-.293-.4 2.7-.4zm9.827 3.059-.053.045c.027-.002.054-.006.08-.009a.681.681 0 0 1-.027-.036zm34.87 2.641.046.007.004-.007zm-28.785.765-.126.02.252.005c-.042-.008-.084-.018-.126-.025zm30.688.22.01.015h.157l-.167-.016zm-294.572 4.56c-.22.199-.44.4-.654.606l-.085.092c.24-.24.5-.457.739-.699zm121.629 11.51c.007.018.016.031.023.05l.015-.045-.038-.005zM40.872 331.474c5.196-1.3 7-1.199 7 .3 0 .9-2.103 1.5-7.1 2-5.995.6-7.401.5-8.8-.9-1.5-1.598-1.398-1.7 1.9-1.201 1.898.4 5.102.2 7-.2zm8.8 1c.1-.1.2 4.204.2 9.5 0 7.593-.3 9.399-1.299 8.6-.7-.6-4.003-1.4-7.5-1.8l-6.2-.7V335.473l5.799-.6c3.097-.3 6.401-1.001 7.2-1.5.8-.5 1.6-.9 1.8-.9zm-19.9.9c.5 0 1.1.8 1.4 1.8.6 2.697.2 14-.599 14.9-1.3 1.3-2.101-.806-2.4-6.5-.3-6.296.3-10.2 1.599-10.2zm3.4 1.999c.4 0 .7 2.904.7 6.501 0 3.597-.3 6.5-.7 6.5-.5 0-.8-2.903-.8-6.5s.3-6.501.8-6.501zm272 7h32.8l-.3 8.2-.3 8.3h-20.5c-19.784 0-20.499-.1-20.799-1.999-.2-1.798.2-2 3.6-1.7 2.2.199 4.2 0 4.5-.5.3-.5.699-3.503.799-6.6zm-3.8.8c2.4.4 2.6.804 2.3 5.6-.3 4.896-.4 5.101-3.3 5.101-2.693 0-3-.303-3.3-3.7-.4-5.196 1.102-7.7 4.3-7zm250.5 3.1 8.3.3 8.2.3v41l-3.786-.252.186-3.448c0-1.999-.3-3.9-.7-4.2-.5-.3-3.4-.6-6.5-.7l-5.7-.2v-16.4zm-159.799.101h7.799l-.2 20.7c-.3 19.485-.4 20.8-2.2 21.1-1.6.399-1.8 0-1.3-3.1.7-4.696-.608-5.7-7.5-5.7h-5.8v-15.8c0-8.693.3-16.2.7-16.5.3-.4 4.203-.7 8.501-.7zm80 0h7.8l-.2 20.7c-.3 19.485-.401 20.8-2.201 21.1-1.6.399-1.8 0-1.3-3.1.7-4.696-.606-5.7-7.5-5.7h-5.8v-15.8c0-8.693.3-16.2.7-16.5.3-.4 4.201-.7 8.5-.7zm-431.801 3.4c3.797.4 7.2.9 7.5 1.1 1.399 1.5-1.803 2.298-5.7 1.399-2.398-.5-6.001-.599-8-.299-3.497.7-3.598.599-2.2-1.1 1.2-1.498 2.504-1.7 8.4-1.1zm3.4 16.6c2.597-.7 5.2.3 3.9 1.6-1.099 1.198-15 .999-15.4-.2-.299-.8 1.103-1.1 4.2-.901 2.499.2 5.8 0 7.3-.5zm5.7 1c.3 0 .5 4.405.5 9.7 0 7.494-.3 9.398-1.2 8.5-.699-.7-2.601-1.2-4.4-1.2-1.699 0-4.602-.301-6.3-.601-3.098-.6-3.1-.704-3.1-6.9v-6.2l7-.699c3.898-.4 7-1.1 7-1.7 0-.5.2-.9.5-.9zm-20.1 2.2c1.599-2.098 2.4 1.205 2.1 8.599-.2 6.595-.702 7.799-2.4 6.7-1.4-.8-1.099-13.5.3-15.299zm3.9.8c.4 0 .7 2.902.7 6.5 0 3.596-.3 6.499-.7 6.499-.5 0-.8-2.903-.8-6.5s.3-6.499.8-6.499zm525.1 10.2c5 .3 5.1.402 5.7 3.8l.557 3.243-2.156-.144c-8.492-.5-10.4-1.402-9.7-4.6.4-2.398.707-2.6 5.6-2.3zm-173.699.5c.9-1 10.1-.9 10.6.099.3.4.3 1.902 0 3.5-.6 2.898-2.107 3.3-8.2 2.1-2.3-.5-3.1-1.2-3.1-2.899 0-1.2.3-2.5.7-2.8zm80 0c.898-1 10.1-.9 10.6.099.3.4.3 1.902 0 3.5-.6 2.898-2.103 3.3-8.201 2.1-2.294-.5-3.1-1.2-3.1-2.899 0-1.2.3-2.5.7-2.8zm-424.2 3.9c3.297.4 6.4 1 6.9 1.5 1.798 1.598-.205 2-5.6 1.1-2.899-.6-6.602-.8-8.3-.5-2.898.498-2.9.498-1.001-1.1 1.599-1.2 3.304-1.4 8-1zm512.899 2.5c1.1-.1 1.7.2 1.3.5-.3.3-1.2.4-1.9.1-.8-.3-.5-.6.6-.6zM12.858 23.778l.003.166.51-.07zM12.874 172.633c.011.081.02.166.03.25l1.467-.21zm-.01 2.14c-.02.125-.04.25-.063.376l1.57-.075zm-2.425.341c-.002-.012-.072.06-.157.154l.055-.002a1.23 1.23 0 0 0 .08-.108c.016-.026.023-.04.022-.044zM12.568 398.623l.07.174.734-.123zM106.45 1.776c.047.084.102.166.14.252.256-.041.51-.089.765-.138-.302-.036-.603-.076-.904-.114zm33.486 2.367c-.344.047-.681.132-1.027.169.701 0 1.059.003 1.69.004-.221-.056-.442-.115-.663-.173z"
      />
      <Path
        fill={Colors.light.secondary[700]}
        d="M44.671 43.674c-2.7 1.6-3.6 2.7-3.2 3.9.3 1 .1 1.8-.4 1.8-.6 0-1.3.7-1.6 1.6-.5 1.2-.2 1.5.9 1 1-.3 1.3-.2 1 .5-.4.5-1.5.7-2.6.4-1-.4-1.9-.2-1.9.3 0 1.9 1.4 2.1 4.2.6 2.7-1.4 3.1-1.4 4.1 0 1.1 1.4 1.6 1.3 5.2-.7 3-1.8 3.9-2.9 3.8-4.5-.2-1.6.5-2.6 2.2-3.4 3.2-1.4 3.3-4 .3-3.6-1.3.2-2.8.7-3.5 1.1-.6.4-1.4.3-1.8-.3-.9-1.5-2.6-1.2-6.7 1.3zm5.1.9c-4.5 2.9-6.9 3.8-6.9 2.5 0-1.5 6-4.7 7.4-4 .4.3.2 1-.5 1.5zm4.7.3c-1.1.8-2.4 1.5-3 1.5-.5 0-.1.6 1 1.4 1 .8 1.7 1.6 1.4 1.8-2 1.6-6.1 3.8-7 3.8-.5 0-1-.7-1-1.6 0-1-.6-1.4-1.5-1-2.8 1-1.5-.3 1.8-1.9 2.8-1.4 3-1.4 1.3 0-2.3 1.7-1.4 2 1.5.4 1.1-.5 1.7-1.4 1.4-1.9-.3-.5.7-1.6 2.2-2.4 3.6-1.9 4.4-2 1.9-.1zM53.871 65.374v11h45v-22h-45Zm43.8.2.3 8.8h-43.1v-8.3c0-4.6.3-8.7.7-9.1.4-.3 9.9-.5 21.2-.4l20.6.3zM46.871 88.374v5h15v-10h-15zm14 .5v3.5h-13v-7h13zM265.471 37.174c-1.3 1.2-.5 2.3 1.3 1.7 1.1-.3 2.2-.1 2.6.4.4.7-.1.9-1.2.5-1.6-.5-1.5-.3.2 1.1 1.1.9 1.9 2.4 1.7 3.4-.2 1.3 1 2.6 3.4 4.2 3 1.8 4 2 5.5 1 1.5-.9 2.5-.8 4.8.4 3.8 1.9 4.7 0 1.4-3.1-1.3-1.2-2.3-2.8-2.3-3.7 0-2.1-6.5-6-8.8-5.3-.9.3-3.2.2-4.9-.3-1.7-.5-3.4-.7-3.7-.3zm13.3 2.9c3 1.8 4 3.3 2.2 3.3-1.4 0-7.1-3.4-7.1-4.3 0-1.2 1.6-.8 4.9 1zm2.6 6.5c.6.6.4.7-.6.3-1-.4-1.9 0-2.2.9-.6 1.4-1 1.4-4.2-.1-1.9-.9-3.5-2.3-3.5-3 0-1.7 2-1.6 4.4.2 1.1.8 2.5 1.5 3 1.5.6 0-.6-1.1-2.7-2.4-2-1.2-4.1-2.7-4.5-3.1-.9-1 8.9 4.4 10.3 5.7zm4 2.6c-.3.3-1.1 0-1.8-.7-.9-1-.8-1.1.6-.5 1 .3 1.5.9 1.2 1.2zM200.871 44.874v4.5h15v-9h-15zm14 0v3.5h-13v-7h13zM226.871 66.874v24.5h21l-.2-24.3-.3-24.2-10.2-.3-10.3-.3zm18.8.2-.3 22.8-8.2.3-8.3.3v-46.1h17zM417.171 40.074c-1.8.9-3.3 2.2-3.3 2.9 0 .7-2.9 3-6.4 5.2-8.3 5.3-9 7.6-4.2 14 8.6 11.7 11.8 12.3 19.2 3.6 2.6-3 5.2-5.4 5.9-5.4.7 0 2.5-1.4 3.9-3.1 2.6-3 2.6-3.2 1-5.8-2.9-4.3-10.8-13.1-11.9-13-.5 0-2.5.8-4.2 1.6zm14.7 12.5c0 3.5-2 2.6-6.9-3.1-5.3-6.1-6-7.6-3.8-8.4 1.5-.6 10.6 9.2 10.7 11.5zm-13.7-9.2c-.6 2.2-14.2 12.2-15.5 11.4-1.6-1-.7-2 5.7-5.9 3.6-2.2 6.5-4.5 6.5-5.1 0-1.1 1.4-2.1 3.2-2.3.3-.1.4.8.1 1.9zm7.8 9.2c1.5 2 1.7 2.8.7 2.8-1.9 0-9.1-8.8-8.2-10.1.6-1.1 2.6.9 7.5 7.3zm-4.7-.6 3.9 4.6-6.1 6.1c-3.4 3.5-5.7 6.8-5.5 7.6 1 2.6-2.4-.3-7.6-6.5-5.4-6.6-5.9-7.4-3.8-7.4.7 0 4.2-2 7.8-4.5 3.5-2.5 6.6-4.5 6.9-4.5.3 0 2.3 2.1 4.4 4.6zm8.6 5.9c-.7.8-1.7 1.5-2.2 1.5-.5 0-3.3 2.6-6.2 5.7-3 3.2-5.8 5.5-6.2 5-1.1-1.1 11.7-13.7 13.9-13.7 1.6 0 1.7.3.7 1.5zM367.271 43.674c-.2.7-.3 9.1-.2 18.7l.3 17.5 9.8.3 9.7.3v-38.1h-9.5c-6.9 0-9.7.4-10.1 1.3zm18.1 17.7v16.5l-8.2.3-8.3.3v-34.2l8.3.3 8.2.3zM571.871 28.274c0 .5-1.8.7-4 .4-4.6-.6-5.5 1.1-1.5 2.9 1.6.7 2.5 1.9 2.5 3.4 0 1.8 1 2.8 4.3 4.2 3.8 1.8 4.3 1.8 5.4.4 1-1.3 1.7-1.3 3.9-.4 2.5 1.2 4.4.9 4.4-.6 0-.4-1.3-1.6-3-2.5-1.7-1.1-2.7-2.3-2.4-3.2.4-.9-.9-2.1-3.5-3.4-4.4-2.3-6.1-2.6-6.1-1.2zm9 4.3c0 1.2-1.7 1-5-.7-4.4-2.3-3.6-3.6 1-1.8 2.2.9 4 2 4 2.5zm-13-2.2c.8.5 1.1 1 .5 1-.5 0-1.7-.5-2.5-1s-1-1-.5-1c.6 0 1.7.5 2.5 1zm12 5.6c4.2 2.3 4.1 2.6-.2.9-1.3-.5-1.8-.2-1.8.9 0 2-1.3 2-5 .1-4.5-2.3-4-3.2 2-4.3.3-.1 2.5 1 5 2.4z"
      />
      <Path
        fill={Colors.light.secondary[700]}
        d="M574.871 35.374c.8.5 2 1 2.5 1 .6 0 .3-.5-.5-1s-1.9-1-2.5-1c-.5 0-.3.5.5 1zM514.871 59.374v11h54v-22h-54zm52.8-.3-.3 8.8-25.7.3-25.8.2v-18h52.1zM558.871 80.874v4.5h15v-9h-15zm14 0v3.5h-13v-7h13zM317.871 50.874c0 .8.5 1.5 1 1.5.6 0 1-.7 1-1.5s-.4-1.5-1-1.5c-.5 0-1 .7-1 1.5zM331.571 123.974c-.4.4-.7 3.8-.7 7.6v6.8h-5.6c-7.4 0-8.4 1.2-8.4 9.5s1 9.5 8.4 9.5h5.6v5.7c0 3.2.4 6.4.8 7.1.6.9 3.8 1.2 12.3 1l11.4-.3v-47l-11.6-.3c-6.3-.1-11.8.1-12.2.4zm23.1 23.1-.3 22.8-10.7.3-10.8.3v-46.1h22zm-26-7c-1.5.2-4.2.2-6 0-1.8-.2-.6-.4 2.7-.4 3.3 0 4.8.2 3.3.4zm-8 8.1c.2 5.1 0 6.2-1.3 6.2-1.2 0-1.5-1.3-1.5-6.6 0-4.8.3-6.5 1.3-6.2.7.3 1.3 2.8 1.5 6.6zm11-.1.3 6.3h-10.1v-13.1l4.8.3 4.7.3zm-3 8c-1.5.2-4.2.2-6 0-1.8-.2-.6-.4 2.7-.4 3.3 0 4.8.2 3.3.4z"
      />
      <Path
        fill={Colors.light.secondary[700]}
        d="M342.871 133.374c0 2.7-.4 5-1 5-.5 0-1 1.8-1 4s.5 4 1 4c.6 0 1 2.3 1 5.1 0 3.1.4 4.8 1 4.4.6-.3 1-2.6 1-5.1 0-2.4.5-4.4 1-4.4.6 0 1-1.8 1-4s-.4-4-1-4c-.5 0-1-2.3-1-5 0-2.8-.4-5-1-5-.5 0-1 2.2-1 5zM337.571 161.074c-1.8 1.7-.5 3.3 2.8 3.3 2.8 0 3.5-.4 3.5-2 0-1.5-.7-2-2.8-2-1.6 0-3.2.3-3.5.7zm3.3 1.3c0 .5-.7 1-1.6 1-.8 0-1.2-.5-.9-1 .3-.6 1-1 1.6-1 .5 0 .9.4.9 1zM363.371 136.274l-5 .6-.3 5.2-.3 5.3h5c2.7 0 5.3.5 5.6 1 1.4 2.3 2.5-.5 2.5-6.6 0-4.5-.4-6.4-1.2-6.2-.7 0-3.5.4-6.3.7zm6.2 8.3c-.2 1.8-.4.6-.4-2.7 0-3.3.2-4.8.4-3.3s.2 4.2 0 6zm-1.7-2.7v4.5h-9v-3.8c0-2.1.3-4.2.7-4.5.3-.4 2.4-.7 4.5-.7h3.8zM368.371 152.374c-.3.5-2.8 1-5.6 1h-4.9v5c0 5.6 0 5.6 7.8 6.4l5.2.5v-6.4c0-6-1.1-8.8-2.5-6.5zm1.2 9.2c-.2 1.8-.4.6-.4-2.7 0-3.3.2-4.8.4-3.3s.2 4.2 0 6zm-1.7-2.6v4.5l-4.2-.3c-4.3-.3-4.3-.3-4.6-4.6l-.3-4.2h9.1zM575.871 154.374v7.1l11.8-.3 11.7-.3.3-6.8.3-6.7h-24.1zm22 0v5.1l-10.2-.3-10.3-.3-.3-4.8-.3-4.7h21.1zM34.771 109.074c0 .2 0 4.8-.1 10.3v10.1l22.6.2 22.7.2.1-10.3.1-10.3-22.7-.2c-12.4-.1-22.6-.1-22.7 0zm43.1 10.2v8.1h-20.5c-17.6 0-20.5-.2-20.5-1.5 0-1.1 1.1-1.5 3.5-1.5 3.9 0 4.1-.3 4.9-7.5.3-3.3.2-4.3-.4-3-.5 1.1-.9 3.7-.9 5.7-.1 3.5-.3 3.8-3 3.8-3.8 0-4.2-.7-3.5-6.7l.6-5 19.9-.2 19.9-.2zM34.271 147.974c.3.9.6 5.5.6 10.2v8.7h45v-8.6c0-4.8.3-9.4.6-10.3.5-1.4-1.9-1.6-23.1-1.6-21.2 0-23.6.2-23.1 1.6zm43.6 8.9v8.5h-20.5c-19.8 0-20.5-.1-20.5-2 0-1.6.7-2 3.5-2 3.9 0 4.1-.3 4.9-7.5.3-3.3.2-4.3-.4-3-.5 1.1-.9 3.7-.9 5.7-.1 3.7-.2 3.8-3.7 3.8h-3.7l.7-3.8c.3-2 .6-4.5.6-5.4 0-2.1 2.6-2.4 23.8-2.6l16.2-.2zM543.871 198.974c0 4.8-.1 5.1-2.4 4.7-1.5-.3-2.5.1-2.9 1.1-1 2.5.3 4.6 2.9 4.6 2 0 2.4.5 2.4 2.7v2.8l22.6-.2 22.6-.3v-20l-22.6-.3-22.6-.2zm44-.8c0 1.4-.7 1.7-3.9 1.4-2.1-.2-4.1 0-4.4.5-.3.5-.7 3.5-.9 6.6l-.3 5.7h-16.2c-13.8 0-16.3-.2-16.3-1.5 0-1.5 2.3-1.9 8.2-1.5 1.6.1 3.5-.5 4.3-1.4 2.6-2.5 1.5-6.7-1.1-4.5-.9.7-3.2.8-6.4.4-4.9-.7-5-.8-5-4.1v-3.4h21c19.5 0 21 .1 21 1.8zm-1.8 8.2c-.2 3-.5 5.6-.7 5.8-.2.3-1.6.2-3-.2-2.3-.6-2.5-1.1-2.5-6.2v-5.5l3.3.3 3.2.3zm-44.2 0c0 1.1-.4 2-.8 2s-.8-.9-.9-2c-.1-1.1.2-2 .8-2 .5 0 .9.9.9 2zm5 0c0 1.1-.4 2-.8 2s-.8-.9-.8-2 .4-2 .8-2 .8.9.8 2zm2.7 0c-.1 1.1-.5 2-.9 2s-.8-.9-.8-2 .4-2 .9-2c.6 0 .9.9.8 2zm5.3.5c0 .8-.2 1.5-.4 1.5s-.6-.7-1-1.5c-.3-.8-.1-1.5.4-1.5.6 0 1 .7 1 1.5zm1.7.7c-.3.8-.6.5-.6-.6-.1-1.1.2-1.7.5-1.3.3.3.4 1.2.1 1.9zM58.271 200.774c-13.8 2.6-17.4 6.9-8.9 10.7 2.4 1.1 7 2.3 10.2 2.7l5.8.7.3 23.3.2 23.2h20v-23.5c0-22.6.1-23.5 2-23.5 4.6 0 12.3-2.4 14.8-4.5l2.7-2.4-2.1-2.1c-1.1-1.1-4.5-2.8-7.5-3.6-7.7-2.1-28.7-2.7-37.5-1zm28.5.6c15.5 2 20.5 6 11.9 9.5-2.4.9-7 1.9-10.3 2-3.3.2-8.1.7-10.7 1.1-4.8.7-14.3-1-15.4-2.8-1.4-2.2 2.5-4.1 9.4-4.6 8.6-.6 14.6 1.1 13.9 3.9-.3 1-.1 1.9.4 1.9s.9-.9.9-2.1c0-3.2-6-5.2-14.7-4.7-5.8.3-7.7.8-9.5 2.5-1.8 1.8-1.9 2.4-.8 3.7 1 1.3 1 1.6-.3 1.6-3.8 0-11.9-2.3-13.9-4-1.9-1.5-2-2-.9-3.4 3.6-4.3 23.6-6.6 40-4.6zm-2.9 36v22h-17v-44h17zM543.871 255.974c0 4.8-.1 5.1-2.4 4.7-1.5-.3-2.5.1-2.9 1.1-1 2.5.3 4.6 2.9 4.6 1.9 0 2.4.5 2.4 2.5v2.5h44.6c.4 0 .6-4.5.6-10v-10l-22.6-.3-22.6-.3zm43.8-1.4c.3 1.5-.4 1.8-3.7 1.8-2.2 0-4.2.4-4.5.8-.2.4-.6 3.4-.8 6.5l-.3 5.7h-16.2c-13.8 0-16.3-.2-16.3-1.5 0-.8.8-1.5 1.8-1.5s2.3-.5 3-1.2c.9-.9 1.2-.9 1.2 0 0 1.7 4.8 1.5 6.6-.2 2.3-2.4 1.4-6.6-1-4.7-1.6 1.2-6.6 2-6.6 1 0-.5-1.1-.9-2.5-.9-2.2 0-2.5-.4-2.5-3.3 0-1.9.3-3.7.7-4.1.4-.3 9.7-.5 20.7-.4 18.2.3 20.1.5 20.4 2zm-.8 4.5c0 1-.3 3.5-.7 5.6-.5 3.5-.8 3.8-3.7 3.5-1.7-.2-3-.6-2.8-1.1.1-.4.2-2.7.2-5.2 0-4.5 0-4.5 3.5-4.5 2.7 0 3.5.4 3.5 1.7zm-45 4.3c0 1.1-.4 2-.8 2s-.8-.9-.9-2c-.1-1.1.2-2 .8-2 .5 0 .9.9.9 2zm5 0c0 1.1-.4 2-.8 2s-.8-.9-.9-2c-.1-1.1.2-2 .8-2 .5 0 .9.9.9 2zm2.7 0c.1 1.1-.2 2-.8 2-.5 0-.9-.9-.9-2s.4-2 .8-2 .8.9.9 2zm5.3.5c0 .8-.2 1.5-.4 1.5s-.6-.7-1-1.5c-.3-.8-.1-1.5.4-1.5.6 0 1 .7 1 1.5zm1.7.7c-.3.8-.6.5-.6-.6-.1-1.1.2-1.7.5-1.3.3.3.4 1.2.1 1.9zM120.471 346.974c-1.1 3-.7 20.9.6 22.2.7.7 3.9 1.2 7.5 1.2h6.3v3.6c0 5.2 1.8 6.4 9.3 6.4 7.4 0 9.7-1.6 9.7-6.8v-3.1l6.8-.3 6.7-.3v-24l-23.1-.3c-20.5-.2-23.2-.1-23.8 1.4zm46.2 10.6-.3 11.3h-44l-.3-9.9c-.1-5.5 0-10.6.2-11.3.4-1 5.2-1.3 22.6-1.3h22.1zm-30.1 17.5c-.3 1-.5.2-.5-1.7s.2-2.7.5-1.8c.2 1 .2 2.6 0 3.5zm14.3-2.2c0 2.4-.2 2.5-6.5 2.5s-6.5-.1-6.5-2.5.2-2.5 6.5-2.5 6.5.1 6.5 2.5zm1.7 2.2c-.3 1-.5.2-.5-1.7s.2-2.7.5-1.8c.2 1 .2 2.6 0 3.5zm-1.7 2.3c0 .6-2.8 1-6.5 1s-6.5-.4-6.5-1 2.8-1 6.5-1 6.5.4 6.5 1zM468.746 311.561c-4.95-.162-10.074.363-13.674 1.613-2.9 1.1-6.4 3-7.7 4.2-3.5 3.3-3.4 8.5.3 12.3 1.089 1.176 1.653 1.867 1.853 2.386.53.13 1.087.35 1.66.671-.084-.274.172-.3 1.186.144 5.8 2.1 9.7 2.7 17 2.3 11.9-.7 19.8-5.401 19.8-11.801 0-3.6-2.4-6.5-7.8-9.3-2.9-1.5-7.675-2.35-12.625-2.513zm-.174 1.114c6.3.3 9.199.899 12.999 2.799 12.6 6.6 5.6 17.5-12.1 18.7-17.6 1.1-29.3-8-20.7-16.2 4.2-4 10.201-5.6 19.801-5.3zM495.571 375.174c-4.3 4.3-7.5 8.1-7.1 8.5.4.4 1.9.4 3.3.1 3.2-.8 13.1-10.2 12.4-11.9-.2-.7.1-1.6.6-2 1.1-.6.6-2.5-.7-2.5-.4 0-4.2 3.5-8.5 7.8zm8.3-6.5c0 .1-3.3 3.4-7.2 7.2l-7.3 7 7-7.3c6.4-6.7 7.5-7.7 7.5-6.9zm-5 9.2c-2.4 2.5-4.9 4.5-5.4 4.5-.6 0 1.2-2.2 3.9-5 2.7-2.7 5.1-4.7 5.4-4.5.3.3-1.5 2.6-3.9 5zM591.771 368.074c-.1.4-.1 1.1 0 1.5 0 .5-7 6.7-13.4 11.7l-2 1.6 2-2.4 2-2.4-2.7 1.8c-2.8 1.7-3.3 2.6-2.2 3.8 1.3 1.3 10.3-4.4 14.3-8.9 2.2-2.6 4.1-5 4.1-5.5 0-1.1-2-2.2-2.1-1.2zM299.371 370.374c1 1.2 2.5 1.8 3.2 1.5.8-.2 1.2-.1.8.4-.3.5.9 2.1 2.6 3.6 2.5 2 3.4 2.3 4 1.3.9-1.4-5.7-7.5-7.7-7-.7.1-1.5-.2-1.9-.8-.3-.5-1.1-1-1.7-1-.6 0-.3.9.7 2zm8.1 4.2 1.9 2.1-2.7-1.8c-2.9-1.8-3.4-2.5-2-2.5.5 0 1.7 1 2.8 2.2z"
      />
      <Path
        fill={Colors.light.secondary[700]}
        d="M588.371 370.374c-.4.6-1 .8-1.4.6-1.4-.9-8.3 5.6-7.2 6.7.6.6 2.7-.5 6-3.3 2.8-2.4 5.1-4.5 5.1-4.7 0-.7-1.9-.2-2.5.7zm-2.5 2.4c0 .2-.8 1-1.7 1.7-1.6 1.3-1.7 1.2-.4-.4 1.3-1.6 2.1-2.1 2.1-1.3zM408.371 378.874c-1.6 1.3-2.5 2.4-1.9 2.5.6 0 2.1-1.1 3.4-2.5 3-3.2 2.4-3.2-1.5 0zM618.387 15.071l-.016.003.016.001v-.004zM617.976 174.953l-.605.121.627.036c-.009-.054-.015-.105-.022-.157zM618.546 227.128l-.175.047.194.005-.02-.052zM619.032 228.553l-.66.022.768.359a39.919 39.919 0 0 0-.108-.381zm.53 7.156c-.03.02-.058.05-.09.066-.264.088-.225.193.023.294.024-.12.046-.24.067-.36zm-.495 2.103-.696.163.624.098.072-.26zM619.676 387.606c-.47.064-.46.158-.014.31l.014-.31zm-.076 2.105-1.229.164 1.218.228.011-.392zM618.767 401.009l-.396.066.393.025.003-.091zM198.371 402.874l-.001.006h.001Z"
      />
    </>
  );
}
