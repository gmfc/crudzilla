export default (array, lang, options) => {
  switch (lang) {
    case 'pt-br':
      return array[0]
    case 'en':
      return array[1]
    case 'es':
      return array[2]
  }
}
