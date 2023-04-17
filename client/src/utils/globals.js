export const requiredField = 'Required field.'

export const userNameTooShort = 'Username too short.'

export const passwordTooShort = 'Password too short.'

export const telRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const petTypes = ['Any', 'Dog', 'Cat', 'Rabbit', 'Bird', 'Pig']

export const footerLogo =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1681307279/pata_5_geyezh.png'

export const logInPictureLight =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1676643038/7fbac6523f58c558f3f2329469aa5594_hmabe1.jpg'

export const logInPictureDark =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1676644100/image0_2_taakem.jpg'

export const noProfilePictureDark =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1675782681/pngegg_2_fydscv.png'

export const noProfilePictureLight =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1675882255/nbhe8urlmuolmesci04g.png'

export const noProfilePetDark =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1675953123/pngwing.com_2_pzt5nj.png'

export const noProfilePetLight =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1675954405/gato_2_o7iwlu.png'

export const logoWithBrandDark =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1676923781/negro_ggol1w.png'

export const brandLight =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1677687994/petsgram_logo_larger-02_1_ctchek.png'

export const brandDark =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1677687993/petsgram_logo_larger-01_1_dstiix.png'

export const logoWithBrandLight =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1676923781/blanco_wlbvex.png'

export const saveALife =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1681643109/perro_4_bdre67.png'

export const backgroundNight =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1681638097/banner_huellitas_2-01_zchq42.jpg'

export const backgroundDay =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1681715971/40_gozrak.png'

export const instructionsDay =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1681717471/banner_huellitas-06_ka3fct.png'
export const instructionsNight =
  'https://res.cloudinary.com/dugudxkyu/image/upload/v1681717474/banner_huellitas-07_himd2i.png'

export const petStatus = ['Adopted', 'Fostered', 'Available']
export const userRoleColor = (role) => {
  let style = {}

  if (role === true) style['color'] = '#0096FF'
  else style['color'] = '#50C878'

  return style
}

export const petStatusColor = (adoptionStatus) => {
  let style = {}

  if (adoptionStatus === 'Adopted') style['color'] = '#DA70D6'
  else if (adoptionStatus === 'Fostered') style['color'] = '#0096FF'
  else style['color'] = '#50C878'

  return style
}

export const petStatusBgColor = (adoptionStatus) => {
  let style = {}

  if (adoptionStatus === 'Adopted') style['background-color'] = '#DA70D6'
  else if (adoptionStatus === 'Fostered') style['background-color'] = '#0096FF'
  else style['background-color'] = '#50C878'

  return style
}

export const bioeExcdedText = (
  <text>&nbsp;&nbsp;&nbsp;&nbsp;Bio can't exceed 250 characters.</text>
)

export const userLocation = (window) => {
  const location = window.split('/')
  const userLocation = location[location.length - 1]

  return userLocation
}

export const userNames = ({ users }) => {
  if (!Array.isArray(users)) {
    return ''
  }

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{`${user.firstname} ${user.lastname}`}</div>
      ))}
    </div>
  )
}

export const colorScaleChart = [
  'rgb(218 112 214 / 80%)',
  'rgb(22 150 255 / 80%)',
  'rgb(80 200 121 / 80%)',
]
export const bgColorChart = [
  'rgba(153, 102, 255, 0.5)',
  'rgb(196,241,249, 0.5)',
  'rgba(75, 192, 192, 0.5)',
  'rgba(54, 162, 235, 0.5)',
]
export const borderColorChart = [
  'rgb(153, 102, 255)',
  'rgb(196,241,249)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
]
