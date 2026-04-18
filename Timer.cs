using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor.SceneManagement;

public class Timer : MonoBehaviour
{   public int minutes;
    public float seconds;
    public string sceneName = "Level_1";
    // Update is called once per frame
    void Start()
    {
        print(minutes);
        print(seconds);
    }
    void Update()
    {   
        seconds -= Time.deltaTime;
        print(seconds);
        if (seconds <= 0)
        {
            if (minutes > 0)
            {
                seconds += 59.0f;
                minutes -= 1;
                print(minutes);
            }
            else
            {
                EditorSceneManager.LoadScene(sceneName);
            }
        }  
    }
}
