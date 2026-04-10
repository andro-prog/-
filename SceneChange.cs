using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor.SceneManagement;

public class SceneChange : MonoBehaviour
{
    public string sceneName = "Level_1";
    // Update is called once per frame
    void OnTriggerEnter(Collider other)
    {   //загрузить сцену
       EditorSceneManager.LoadScene(sceneName);
    }
}
