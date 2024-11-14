export default defineAppConfig({
  title: 'SpendingSense',
  theme: {
    dark: false
  },
  head: {
    script: [
      {
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        async: true,
        'data-ad-client': 'ca-pub-XXXXXXXXXXXXXXXX' // Replace with your AdSense publisher ID
      }
    ]
  }
})
