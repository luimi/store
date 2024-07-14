import black_1 from './1-black.png';
import blue_1 from './1-blue.png';
import pale_1 from './1-pale.png';
import red_1 from './1-red.png';
import yellow_1 from './1-yellow.png';
import black_2 from './2-black.png';
import blue_2 from './2-blue.png';
import pale_2 from './2-pale.png';
import red_2 from './2-red.png';
import yellow_2 from './2-yellow.png';
import black_3 from './3-black.png';
import blue_3 from './3-blue.png';
import pale_3 from './3-pale.png';
import red_3 from './3-red.png';
import yellow_3 from './3-yellow.png';

const styles = {
  "black": [
    black_1,
    black_2,
    black_3,
  ],
  "blue": [
    blue_1,
    blue_2,
    blue_3,
  ],
  "pale": [
    pale_1,
    pale_2,
    pale_3,
  ],
  "red": [
    red_1,
    red_2,
    red_3,
  ],
  "yellow": [
    yellow_1,
    yellow_2,
    yellow_3,
  ]
}
export const getCouponStyle = (color, style) => {
  return styles[color][style]
}