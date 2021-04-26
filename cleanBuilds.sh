
echo clean XCode project
cd ios
xcodebuild clean

echo cleaning adroid project
cd ../android
./gradlew clean

cd ..
