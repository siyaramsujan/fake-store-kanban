export type User = {
  id: string
  email: string
  username: string
  password: string
  phone: string
  name: {
    firstname: string
    lastname: string
  }
  address: {
    geolocation: {
      lat: string
      long: string
    }
    city: string
    street: string
    number: number
    zipcode: string
  }
  __v: number
}
