if exist "release" rd "release" /s /q
del "release.zip"
mkdir "release"
xcopy css release\css\ /e /y
xcopy img release\img\ /e /y
xcopy js release\js\ /e /y
xcopy html release\html\ /e /y
xcopy lib release\lib\ /e /y

echo f | xcopy manifest.json release\manifest.json /y