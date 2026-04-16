using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{   private int coins;
    public int HP = 10;
    public GameObject fireballPrefab;
    public Transform attackPoint;
    public void CollectCoins()
    {
        coins++;
        print("Собранные монеты:" + coins);
        
    }
    public void TakeDamage(int damage)
    {
        HP-=damage;
        print(HP);
    }
    public void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Instantiate(fireballPrefab, attackPoint.position, attackPoint.rotation);
        }
    }
}
