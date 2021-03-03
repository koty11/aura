const path = require('path')
const FakeApiGatewayLambda =
  require('fake-api-gateway-lambda').FakeApiGatewayLambda


async function main() {
    const gateway = new FakeApiGatewayLambda({
      port: 8080,
      routes: {
        '/zipcode': path.join(__dirname, '..', 'src', 'index.js')
      }
    })
  
    await gateway.bootstrap();
    console.log('API Gateway running on localhost:8080');
  }
  
  process.on('unhandledRejection', (err) => { throw  err })
  main();