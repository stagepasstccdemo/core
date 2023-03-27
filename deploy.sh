# Download JQ
curl -L https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -o ./jq

# Make JQ executable
chmod a+x ./jq

# Get the version from package.json
VERSION=$(node --eval="process.stdout.write(require('./package.json').version)")

# Install dependencies
yarn install

# Build the app
yarn build

# Deploy to S3
aws s3 cp s3://mfe-stage-pass/config/import-map.json import-map.json
NEW_URL=/config/mfe/root-config/$VERSION/stagepass-root-config.js
cat ./import-map.json | jq --arg NEW_URL "$NEW_URL" '.imports["@stagepass/root-config"] |= $NEW_URL' > new.importmap.json
aws s3 cp dist s3://mfe-stage-pass/config/mfe/root-config/$VERSION --recursive
aws s3 cp dist/index.html s3://mfe-stage-pass/index.html
aws s3 cp new.importmap.json s3://mfe-stage-pass/config/import-map.json
aws cloudfront create-invalidation --distribution-id ELQLVB5EJD6XG --paths '/config/import-map.json'
