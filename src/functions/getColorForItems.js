import { COLOR } from 'react-native-material-ui';
export default function getColorForItems(index) {
    const indEl = index.toString().split('').pop();
    switch (indEl) {
      case '1':
        return COLOR.amber900;
      case '2':
        return COLOR.green900;
      case '3':
        return COLOR.yellow900;
      case '4':
        return COLOR.red900;
      case '5':
        return COLOR.blue900;
      case '6':
        return COLOR.black;
      case '7':
        return COLOR.deepOrange900;
      case '8':
        return COLOR.indigo900;
      case '9':
        return COLOR.pink900;
      case '0':
        return COLOR.brown900;
    }
  }
