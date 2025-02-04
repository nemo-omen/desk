import { Header } from '../../view/components/Header';

export const Base = ({children, title}) => {
  if(title != '') {
    title = ` | ${title}`
  }
  return (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/public/css/main.css" />
      <link rel="shortcut icon" href="/public/favicon.svg" type="image/svg+xml" />
      <title>Current{title}</title>
    </head>
    <body>
      <Header />
        {children}
    </body>
    </html>
  )
};