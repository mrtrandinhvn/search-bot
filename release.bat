if exist "release" rd "release" /s /q
del "release.zip"
mkdir "release"
xcopy css release\css\ /e /y
xcopy img release\img\ /e /y
echo d | xcopy js\built release\js\built /e /y
echo f | xcopy js\background-page.js release\js\background-page.js /y
xcopy html release\html\ /e /y
xcopy lib release\lib\ /e /y

echo f | xcopy manifest.json release\manifest.json /y