import { Position } from 'nativescript-google-maps-sdk';

export class Place {
  public location:Position;
  public title:string;
  public address:string;
  public type:string;
  public origin:string;
  public externalId:string;
}

export interface PlaceMap {
  id?:string,
  location:Position;
  name:string;
  address:string;
  type:string;
  origin:string;
  externalId:string;
  imageRefId?:string;
  imageRef?:string;
}

export const CONTEXT_VALUES = [
  { value: 'family', label: 'En famille'},
  { value: 'couple', label: 'En couple'},
  { value: 'friends', label: 'Entre amis'},
  { value: 'meeting', label: 'Pour faire des rencontres'},
];

export const PlaceImgPlaceholder = 'iVBORw0KGgoAAAANSUhEUgAAAV4AAACWCAMAAAChORBFAAAAG1BMVEXMzMyWlpbFxcWqqqqcnJyxsbG3t7e+vr6jo6OVuynYAAAAHGlET1QAAAACAAAAAAAAAEsAAAAoAAAASwAAAEsAAAJnQcWkAAAAAjNJREFUeAHs1u2ygiAUhWFRUu7/is/aCGzS7MOZM5PNy59IaCVPsG0YaAgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAgg8FxinGEKcxjLrFlqL9YM2JU5Lffvm6xKCz3wQey7VIy/Ra+u+rbc7Nd1QeeWU2/zZgpTsH9jHnkz1yCv0ZtdcfZNfKLzVIYTPfHUoXGAXezbVI6/Qs8KwjOOs15DrQwxpLq1UAw2lZVwEFGsFeWdldix83i72ZKonXqGnzZvW+9Ry8/bd7VFNWbexfEsBeb2y/Gv0vNvYU6mvv/fLZqgklj2qw2rQY7tQ71Sq6xQN1Wpcx45e7SxYa+O72DOpLe0yHTmUey14Ut5UAFcSyWbsaJ3Z1j84DLtYH3w/9ejbvve6b0jx2u7Vob2/W8FM5Yqqafdw0wfqWw2UElNmpqjmgvvYw9T7L7/6u3mu/2bLgm/bAtCZdia2bo2sxcKga0wH4ifD5t7XlePULuCXujqjtjUn7cNbCjHVferV2epyv0lH+eVnnabUDd6L9Lzb2OPUPuFX+vlBn+kka6darfwLa88grbVu17JsFRIrxrZ5H9Xknncb+yT1V0zbOrSV1FImKrZ2YfXtnzwb3kGTtW014+Eftp53G/sstd3X/3X+AAAA//88k9zFAAACpklEQVTt19lygzAQRFF2+P8vTo82RgL0mColl6rEksCd6Hg82NP0i8c627Eu9idttC/LaWurLVzzHE7YeJtneyjHqYsW/drKih/4q9vYXqrP+AvjyDtvxmhgYU9HGnkkPw4XSWnVz/Gq4K9uY/05P34NGn4xVqsV4b6faTdi2zXs1tliVflRvFWtt7Hd1OE5XzZgb/SqCrVwNbxPyVD4+QVpUt+rMsZ63mdqE/QnpntqtmUzcduCKHxPCCtfexHejndetR+9S/qpb2mjr6VqvbcReVSfmVeWLaV16NCz76eV0QdvWO6nlojBB/u23Q2hrc3Io6LOl+gFCB8m3KZ1TWzRbi0Pe7z91Jww+qOKz25f4Qi1eezZctLc7nWuqJ1Jeo5WDLh8ckvL8cHxPmK7qVXKyBNfj2Hsbjn5nPjSFt3JuGKd99RqW9PxrON1z0yxndSRQZv/3ZWeCI7JFWiY63I9xuabytklqIOuVuWlO7tz1ZeQZ2wntQoZeyKg1B0koDe5aiu91eNcu1MDid/KJFI6Sdi1waovKKO944XTrnqfsd+pY4PW/73tez2X5ZBdwJPJdohZZhlTS9e5WBNomqxWrC2YcunYLt7x2leMJvYz1SWMPzTGdIQSNG8/1w7vpRqxlKQKPdZ3zeF574xc6fdKnVpnDD+zogxHuj/ZJ1k/1wbzUuMgvvgcK9+6bQQVz1sy7tvgR+rwoM0GjksO25q/O0zLWs91uS25K2KA8aRPZKVPV9EV70vsa2qVwAQBBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEDgHwv8AOCmDkKra87VAAAAAElFTkSuQmCC';