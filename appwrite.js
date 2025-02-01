import { Client, Storage } from "react-native-appwrite";

const client = new Client()
.setEndpoint('http://localhost/v1')
.setProject('6766418d00144ad14059')
.setPlatform('com.anonymous.Atomix');

const storage = new Storage(client);

export { storage }