import EnglishFlyer from 'assets/media/englishFlyer.png'
import ChineseFlyer from 'assets/media/chineseFlyer.png'
import EnglishCard from 'assets/media/englishInfoCard.png'
import ChineseCard from 'assets/media/chineseInfocard.png'


export default [
  {
    title:'VIPH Poster', 
    language:'English', 
    imageUrl: EnglishFlyer, 
    description: 'Poster to display in waiting room and patient room areas. Patients can scan the QR code to download VIPHealth from the app store.',
    suggestion: '(Glossy paper recommended for printing)'
  },
  {
    title:'VIPH Poster', 
    language:'Chinese', 
    imageUrl: ChineseFlyer, 
    description: 'Poster to display in waiting room and patient room areas. Patients can scan the QR code to download VIPHealth from the app store.',
    suggestion: '(Glossy paper recommended for printing)'
  },
  {
    title:'VIPH Info Card',
    language:'English',  
    imageUrl: EnglishCard, 
    description: 'Information cards that can be placed in waiting room and reception areas. Patients can take a card and download the app using the QR code at their own convenience.',
    suggestion: '(Cardstock recommended for printing)'
  },
  {
    title:'VIPH Info Card', 
    language:'Chinese', 
    imageUrl: ChineseCard, 
    description: 'Information cards that can be placed in waiting room and reception areas. Patients can take a card and download the app using the QR code at their own convenience.',
    suggestion: '(Cardstock recommended for printing)' 
  },
]