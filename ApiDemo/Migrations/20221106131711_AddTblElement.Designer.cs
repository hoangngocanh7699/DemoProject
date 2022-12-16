﻿// <auto-generated />
using System;
using ApiDemo.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ApiDemo.Migrations
{
    [DbContext(typeof(ApiDemoDbContext))]
    [Migration("20221106131711_AddTblElement")]
    partial class AddTblElement
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("ApiDemo.Data.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastUpdatedTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("ParentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TodoId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TodoId");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("ApiDemo.Data.Element", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DueDate")
                        .HasColumnType("date");

                    b.Property<string>("ElementDescription")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("ElementName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime?>("LastUpdatedTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("ParentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TodoId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("TodoId");

                    b.ToTable("Element");
                });

            modelBuilder.Entity("ApiDemo.Data.Todo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LastUpdatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("TodoName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Todo");
                });

            modelBuilder.Entity("ApiDemo.Data.Category", b =>
                {
                    b.HasOne("ApiDemo.Data.Todo", "Todo")
                        .WithMany("Categories")
                        .HasForeignKey("TodoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Todo");
                });

            modelBuilder.Entity("ApiDemo.Data.Element", b =>
                {
                    b.HasOne("ApiDemo.Data.Todo", "Todo")
                        .WithMany("Elements")
                        .HasForeignKey("TodoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Todo");
                });

            modelBuilder.Entity("ApiDemo.Data.Todo", b =>
                {
                    b.Navigation("Categories");

                    b.Navigation("Elements");
                });
#pragma warning restore 612, 618
        }
    }
}
