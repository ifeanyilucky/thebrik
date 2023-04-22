export const config = {
  social: {
    facebook: 'https://facebook.com/thebrik.co',
    twitter: 'https://twitter.com/thebrik_co',
    instagram: 'https://instagram.com/thebrik.co'
  },
  host: 'https://thebrik.co',
  email: {
    info: 'thebrik.co@gmail.com',
    admin: 'admin@Thebrik.co',
    support: 'thebrik.co@gmail.com'
  },
  bank: {
    bankName: 'Stanbic IBTC',
    accountNumber: '0032980005',
    accountName: 'Thebrik Nigeria Limited'
  },
  tel: {
    support: '+2349138770915',
    support1: '+2349025519205',
    support2: '09071499826'
  },
  paystack: {
    public: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY
  },
  api: process.env.REACT_APP_API
};

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
