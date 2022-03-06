#!/bin/sh
# Clean jitsi bundle
if [ -f "android/app/build/intermediates/merged_assets/release/mergeReleaseAssets/out/index.android.bundle" ]; then
  echo "Cleaning release merged jitsi lib"
  sed -i "" 's/l.playTouchSound()//g' android/app/build/intermediates/merged_assets/release/mergeReleaseAssets/out/index.android.bundle
fi
if [ -f "android/app/build/intermediates/merged_assets/release/out/index.android.bundle" ]; then
  echo "Cleaning release merged jitsi lib"
  sed -i "" 's/l.playTouchSound()//g' android/app/build/intermediates/merged_assets/release/out/index.android.bundle
fi
if [ -f "android/app/build/intermediates/merged_assets/debug/mergeDebugAssets/out/index.android.bundle" ]; then
  echo "Cleaning debug merged jitsi lib"
  sed -i "" 's/l.playTouchSound()//g' android/app/build/intermediates/merged_assets/debug/mergeDebugAssets/out/index.android.bundle
fi
if [ -f "android/app/build/intermediates/merged_assets/debug/out/index.android.bundle" ]; then
  echo "Cleaning debug merged assets jitsi lib"
  sed -i "" 's/l.playTouchSound()//g' android/app/build/intermediates/merged_assets/debug/out/index.android.bundle
fi
if [ -f "android/app/build/intermediates/assets/debug/index.android.bundle" ]; then
  echo "Cleaning debug jitsi lib"
  sed -i "" 's/l.playTouchSound()//g' android/app/build/intermediates/assets/debug/index.android.bundle
fi
if [ -f "android/app/build/intermediates/assets/release/index.android.bundle" ]; then
  echo "Cleaning release jitsi lib"
  sed -i "" 's/l.playTouchSound()//g' android/app/build/intermediates/assets/release/index.android.bundle
fi
# Clean svg files from drawable folder (svg files are inlined by babel)
echo "Cleaning svg files from drawable folder"
rm -rf android/app/build/generated/res/react/release/drawable-mdpi/*.svg
echo "Done"