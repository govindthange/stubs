# Jenkins Multiline Pipeline (v2.339)

1. Go to jenkins dashboard.
2. Click on `New Item`.
3. Enter `Name` as "Basic Multibranch Pipeline".
4. Select `Multibranch Pipeline` from the list below.
5. Hit `OK` button.
6. Enter `Display Name` as "Basic Multibranch Pipeline".
7. Select `Branch Sources` as `Git`.
9. Provide following path as `Git Project Repository`:
    - https://github.com/govindthange/stubs.git
10. Select `Credentials` as `-none-`.
11. Under `Behaviors` delete`Discover branches` by clicking on the red cross towards the right.
12. Under `Behaviors` click on `Add` button.
13. Select `Filter by name (with regular expression)`.
14. Enter `^master` in `Regular expression`.
15. Under `Build Configuration` -> `Mode` -> `by Jenkinsfile` enter following path:
    - jenkins/multibranch-pipeline/Jenkinsfile
16. Hit `Save` button.
