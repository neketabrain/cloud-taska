import {
  query,
  where,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore';

import { firestore, auth } from '../firebase';

import { NewTask, Task } from './model';

export async function fetchTasks(): Promise<Task[] | undefined> {
  const viewer = auth.currentUser;

  if (!viewer) {
    return;
  }

  const tasksCollection = collection(firestore, 'tasks') as CollectionReference<Task>;
  const tasksQuery = query(tasksCollection, where('owner_id', '==', viewer.uid));
  const tasks = await getDocs(tasksQuery);

  return tasks.docs.map((task) => ({ ...task.data(), id: task.id }));
}

export async function createTask(data: NewTask): Promise<Task | undefined> {
  const viewer = auth.currentUser;

  if (!viewer) {
    return;
  }

  const tasksCollection = collection(firestore, 'tasks') as CollectionReference<Task>;
  const taskRef = await addDoc<Omit<Task, 'id'>>(tasksCollection, { ...data, owner_id: viewer.uid });
  const task = await getDoc(taskRef);

  if (task.exists()) {
    return { ...task.data(), id: task.id };
  }
}

export async function editTask({ id, ...data }: Task): Promise<Task | undefined> {
  const taskRef = doc(firestore, 'tasks', id) as DocumentReference<Task>;
  await updateDoc(taskRef, { ...data });
  const task = await getDoc(taskRef);

  if (task.exists()) {
    return { ...task.data(), id: task.id };
  }
}

export async function toggleTask(data: Pick<Task, 'id' | 'completed'>): Promise<Task | undefined> {
  const taskRef = doc(firestore, 'tasks', data.id) as DocumentReference<Task>;
  await updateDoc(taskRef, { completed: !data.completed });
  const task = await getDoc(taskRef);

  if (task.exists()) {
    return { ...task.data(), id: task.id };
  }
}

export async function deleteTask(id: string): Promise<void> {
  const taskRef = doc(firestore, 'tasks', id) as DocumentReference<Task>;
  await deleteDoc(taskRef);
}
